import React from 'react';


//import { Container, Table } from "semantic-ui-react";
import { List } from "semantic-ui-react";
import { useStateValue } from "../state";
import axios from "axios";
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
//import { Icon } from "semantic-ui-react";
import GendreSymbol from "../components/GendreSymbol";
import { showSinglePatient } from "../state/reducer";

//Määritellään entry propsin tyyppi
type EntryProps = {
    entry: Entry[];
};
//Määritellään diagnoosikoodin tyyppi
type DiagnosisCodesProps = {
    codes?: string[];
};
//Komponentti diagnoosikoodien renderöimiseksi
const DiagnosisCodes = ({ codes }: DiagnosisCodesProps) => {
    if (codes != undefined) {
        return (
            <div>
                <List bulleted>
                    {codes.map((code: string) => <List.Item key={code}>{code}</List.Item>)}
                </List>
            </div>);
    }
    return null;
};

//Komponentti Entryn renderöimiseksi
const Entries = ({ entry }: EntryProps) => {
    console.log('ENTRY', entry);
    if (entry != undefined) {
        return (
            <div>
                <List>
                    {entry.map((entry: Entry) => <List.Item key={entry.id}>{entry.date} {entry.description}
                        <DiagnosisCodes codes={entry.diagnosisCodes}></DiagnosisCodes>
                    </List.Item>)}
                </List>
            </div>);
    }
    return null;
};



//Päivitetään "effect"-hookilla "state" ja haetaan "useParams":lla id URL:sta
export const SinglePatientVieweri = () => {
    //console.log('EKA LOCAL STORAGE', JSON.parse(localStorage.getItem('patient') || '{}'));
    //console.log('TULEEKO TÄNNEkkäänkö');
    const [{ patients }, dispatch] = useStateValue();
    //Haetaan yksittäinen potilas kannasta
    //id "useParams":lla "url":sta
    const { id } = useParams<{ id: string }>();
    //Haetaan "effect hookilla" käyttäjä backendistä
    React.useEffect(() => {
        //console.log('USER ID URL:STA', id);
        const fetchSinglePatient = async () => {
            try {
                const { data: singlePatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                //console.log('SINGLE PATIENT', singlePatient.entries[0].diagnosisCodes);
                //dispatch({ type: "SHOW_SINGLE_PATIENT", payload: singlePatient });
                dispatch(showSinglePatient(singlePatient));
            } catch (e) {
                console.error(e);
            }
        };
        void fetchSinglePatient();

    }, [dispatch]);

    /*
        let patientJson: any  = JSON.parse(localStorage.getItem('patient')|| '{}');
        let patientti: Patient = <Patient> patientJson;
        */

//Yksittäisen potilaan tietojen renderöimiseen
    return (<div className="App">
        <List>
            {Object.values(patients).map((patient: Patient) => (
                <List.Item key={patient.id}>
                    <List.Header as="h2">{patient.name}<GendreSymbol gendre={patient.gender} /></List.Header>
                    <br></br>
                    ssn: <>{patient.ssn}</>
                    <br></br>
                    occupation: <>{patient.occupation}</>
                    <List.Item key={patient.id}>
                        <br></br>
                        <List.Header as="h3">entries</List.Header>
                        <Entries entry={patient.entries}></Entries>
                    </List.Item>
                </List.Item>
            ))}
        </List>
    </div>
    );
};

export default SinglePatientVieweri;