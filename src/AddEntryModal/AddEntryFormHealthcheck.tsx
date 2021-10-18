import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
//formin kenttien validointiin
import * as Yup from 'yup';

import { TextField, HealthCheckRatingOption, HealthCheckSelectField, DiagnosisSelection } from "./EntryFormField";
import { HealthCheckRating, HealthCheckEntry } from "../types";
import { useStateValue } from "../state";

//Formin arvot ilman ID:tä. ID backendin vastuulla
export type EntriesFormValues = Omit<HealthCheckEntry, "id">;

//Propsit tietojen lähetykselle ja formin canceloimiselle
interface Props {
  onSubmit: (values: EntriesFormValues) => void;
  onCancel: () => void;
}
//Alasvetovalikon vaihtoehdot terveyden reittaamiseen
const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" }
];
//Kenttien description ja specialist validointiin schema
//Vaatii Yup-kirjaston asennuksen "npm install yup --save"
const EntryFillSchema = Yup.object().shape({
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(80, 'Too Long!')
  ,
  specialist: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
});

//Päimäärän formaatin validointiin
//formaatin tarkistuksen "kaava" kopioitu netistä eli tarkastaa
//että "YYYY-MM-DD" ja kuukausien määrä max 12 ja päivien 31.
const validateDate = (value: string) => {
  let error = '';
  if (!/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(value)) {
    error = 'Date format must be YYYY-MM-DD';
  }
  return error;
};
//Patientin entryn lisäämiselle formi/lomake
export const AddEntriesForm = ({ onSubmit, onCancel }: Props) => {
  //Haetaan statesta kaikki diagnoosit
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: HealthCheckRating.Healthy
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
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, errors, touched }) => {
        return (
          <Form className="form ui">
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
            <HealthCheckSelectField
              label="Health Check Rating"
              name="healthCheckRating"
              options={healthCheckRatingOptions}
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

export default AddEntriesForm;
