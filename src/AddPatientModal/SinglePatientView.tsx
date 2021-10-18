import React from 'react';
import { List, Button } from "semantic-ui-react";
import { useStateValue } from "../state";
import axios from "axios";
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import GendreSymbol from "../components/GendreSymbol";
import Entries from "../components/Entries";
import { showSinglePatient, addNewEntryPatientille } from "../state/reducer";

//Uutta entryä varten
import AddEntryModal from "../AddEntryModal";
import AddOccupationalHealthcareEntryModal from "../AddOccupationalEntryModal";
import AddHospitalEntryModal from "../AddHospitalEntryModal";

import { EntriesFormValues } from "../AddEntryModal/AddEntryFormHealthcheck";
import { EntriesFormValuesOccupationalHealthcare } from "../AddOccupationalEntryModal/AddEntryFormOccupationalHealthcare";
import { EntriesFormValuesHospital } from "../AddHospitalEntryModal/AddEntryFormHospital";

//Päivitetään "effect"-hookilla "state" yksittäisen potilaan ja diagnoosien osalta haetaan "useParams":lla 
//potilaan "id" URL:sta
export const SinglePatientVieweri = () => {
    //console.log('TULEEKO TÄNNEkkäänkö');
    const [{ singlePatient }, dispatch] = useStateValue();
    //id "useParams":lla "url":sta
    const { id } = useParams<{ id: string }>();

    //Healthcheck Entrylle oma lomake
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    //Occupational entrylle oma lomake
    const [modalOpenOccupational, setModalOpenOccupational] = React.useState<boolean>(false);
    const [errorOccupational, setErrorOccupational] = React.useState<string | undefined>();
    const openModalOccupational = (): void => setModalOpenOccupational(true);
    const closeModalOccupational = (): void => {
        setModalOpenOccupational(false);
        setErrorOccupational(undefined);
    };

    //Hospital entrylle oma lomake
    const [modalOpenHospital, setModalOpenHospital] = React.useState<boolean>(false);
    const [errorHospital, setErrorHospital] = React.useState<string | undefined>();
    const openModalHospital = (): void => setModalOpenHospital(true);
    const closeModalHospital = (): void => {
        setModalOpenHospital(false);
        setErrorHospital(undefined);
    };


    //console.log('SINGLE PATIENT singlepatientviewerissä', singlePatient.entries);
    //Haetaan "effect hookilla" käyttäjä backendistä
    React.useEffect(() => {
        //console.log('USER ID URL:STA', id);
        const fetchSinglePatient = async () => {
            try {
                const { data: singlePatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                //dispatch({ type: "SHOW_SINGLE_PATIENT", payload: singlePatient });
                dispatch(showSinglePatient(singlePatient));
            } catch (e) {
                console.error(e);
            }
        };
        void fetchSinglePatient();
    }, [dispatch]);

    //Healthcheck entryn lisäämiseen
    const submitNewEntryForPatient = async (values: EntriesFormValues) => {
        //console.log('ADD ENTRY FOR PATIENT', values);
        try {
            const { data: newEntryForPatient } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${singlePatient.id}/entries`,
                values
            );
            //Päivitetään patientin tilaa uuden entryn osalta
            dispatch(addNewEntryPatientille(singlePatient, newEntryForPatient));
            //console.log('NEWENTRYFORPATIENT', newEntryForPatient);
            closeModal();
        } catch (e) {
            console.log('ERROR');
            //console.error(e.response?.data || 'Unknown Error');
            //setError(e.response?.data?.error || 'Unknown error');
        }
    };

    //Occupational healthcare entryn lisäämiseen
    const submitNewOccupationalHealthcareEntryForPatient = async (values: EntriesFormValuesOccupationalHealthcare) => {
        //console.log('ADD ENTRY FOR PATIENT', values);
        try {
            const { data: newEntryForPatient } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${singlePatient.id}/entries`,
                values
            );
            //Päivitetään patientin tilaa uuden entryn osalta
            dispatch(addNewEntryPatientille(singlePatient, newEntryForPatient));
            //console.log('NEWENTRYFORPATIENT', newEntryForPatient);
            closeModalOccupational();
        } catch (e) {
            console.log('ERROR');
            //console.error(e.response?.data || 'Unknown Error');
            //setError(e.response?.data?.error || 'Unknown error');
        }
    };
    //Hospital entryn lisäämiseen
    const submitNewHospitalEntryForPatient = async (values: EntriesFormValuesHospital) => {
        //console.log('ADD ENTRY FOR PATIENT', values);
        try {
            const { data: newEntryForPatient } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${singlePatient.id}/entries`,
                values
            );
            //Päivitetään patientin tilaa uuden entryn osalta
            dispatch(addNewEntryPatientille(singlePatient, newEntryForPatient));
            //console.log('NEWENTRYFORPATIENT', newEntryForPatient);
            closeModalHospital();
        } catch (e) {
            console.log('ERROR');
            //console.error(e.response?.data || 'Unknown Error');
            //setError(e.response?.data?.error || 'Unknown error');
        }
    };

    //Yksittäisen potilaan tietojen renderöimiseen
    return (<div className="App">
        <List>
            <List.Item key={singlePatient.id}>
                <List.Header as="h2">{singlePatient.name}<GendreSymbol gendre={singlePatient.gender} /></List.Header>
                <br></br>
                ssn: <>{singlePatient.ssn}</>
                <br></br>
                occupation: <>{singlePatient.occupation}</>
                <List.Item key={singlePatient.id}>
                    <br></br>
                    <List.Header as="h3">entries</List.Header>
                    <Entries entry={singlePatient.entries}></Entries>
                </List.Item>
            </List.Item>
        </List>
        <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntryForPatient}
            error={error}
            onClose={closeModal}
        />
        <AddOccupationalHealthcareEntryModal
            modalOpen={modalOpenOccupational}
            onSubmit={submitNewOccupationalHealthcareEntryForPatient}
            error={errorOccupational}
            onClose={closeModalOccupational}
        />

        <AddHospitalEntryModal
            modalOpen={modalOpenHospital}
            onSubmit={submitNewHospitalEntryForPatient}
            error={errorHospital}
            onClose={closeModalHospital}
        />

        <Button onClick={() => openModal()}>Healthcheck entry</Button>
        <Button onClick={() => openModalOccupational()}>Occupational Healthcare entry</Button>
        <Button onClick={() => openModalHospital()}>Hospital entry</Button>
    </div>
    );
};

export default SinglePatientVieweri;