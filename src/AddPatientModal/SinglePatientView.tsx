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
//import { addNewPatient } from "../state/reducer";
import { EntriesFormValues } from "../AddEntryModal/AddEntryForm";



//Päivitetään "effect"-hookilla "state" yksittäisen potilaan ja diagnoosien osalta haetaan "useParams":lla 
//potilaan "id" URL:sta
export const SinglePatientVieweri = () => {
    //console.log('TULEEKO TÄNNEkkäänkö');
    const [{ singlePatient }, dispatch] = useStateValue();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    //id "useParams":lla "url":sta
    const { id } = useParams<{ id: string }>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined); 
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
        <Button onClick={() => openModal()}>Add New Entry for Patient</Button>
    </div>
    );
};

export default SinglePatientVieweri;