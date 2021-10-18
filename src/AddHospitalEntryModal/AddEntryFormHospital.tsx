import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
//formin krnttien validointiin
import * as Yup from 'yup';

import { TextField, DiagnosisSelection } from "./HospitalEntryFormField";
import { HospitalEntry } from "../types";
import { useStateValue } from "../state";

//Formin arvot ilman ID:tä. ID backendin vastuulla
export type EntriesFormValuesHospital = Omit<HospitalEntry, "id">;

//Propsit tietojen lähetykselle ja formin canceloimiselle
interface Props {
    onSubmit: (values: EntriesFormValuesHospital) => void;
    onCancel: () => void;
}

//Kenttien validointiin schema
//Vaatii Yup-kirjaston asennuksen "npm install yup --save"
const EntryFillSchema = Yup.object().shape({
    description: Yup.string()
        .min(2, 'Too Short!')
        .max(80, 'Too Long!')
    ,
    specialist: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
    ,
    employerName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
    ,
    //Koska olio, niin "ali Yuppaus tarvitaan"
    sickLeave: Yup.object().shape({
        startDate: Yup.date(),
        endDate: Yup.date().min(
            //Verrataan "startDateen"
            Yup.ref('startDate'),
            "End date can't be before start date"
        )
    }),
    //Koska olio, niin "ali Yuppaus tarvitaan"
    discharge: Yup.object().shape({
        date: Yup.date()
            .required("Field is required"),
        criteria: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .required("Field is required")
    })

});



//Päivämäärän formaatin validointiin
//formaatin tarkistuksen "kaava" kopioitu netistä eli tarkastaa
//että "YYYY-MM-DD" ja kuukausien määrä max 12 ja päivien 31.
const validateDate = (value: string) => {
    console.log('VALIDATE DATE', value);
    let error = '';
    if (!/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(value)) {
        error = 'Date format must be YYYY-MM-DD';
    }
    return error;
};
//Patientin entryn lisäämiselle formi/lomake
export const AddHospitalForm = ({ onSubmit, onCancel }: Props) => {
    //Haetaan statesta kaikki diagnoosit
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: "Hospital",
                description: "",
                date: "",
                specialist: "",
                discharge: {
                    date: "",
                    criteria: ""
                }
            }}
            //Validointiskeema, joka määritelty omassa komponentissa
            validationSchema={EntryFillSchema}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }

                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched, errors, touched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            validate={validateDate}
                            label="Discharge date"
                            placeholder="YYYY-MM-DD"
                            name="discharge.date"
                            component={TextField}
                        />{errors.date && touched.date}
                        <Field
                            //validate={validateDate}
                            label="Discharge criteria"
                            placeholder="Discharge criteria"
                            name="discharge.criteria"
                            component={TextField}
                        />{errors.date && touched.date}
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />{errors.description && touched.description}

                        <Field
                            validate={validateDate}
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />{errors.date && touched.date}

                        <Field
                            label="Specialist"
                            placeholder="Spessu"
                            name="specialist"
                            component={TextField}
                        />{errors.specialist && touched.specialist}

                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />

                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddHospitalForm;
