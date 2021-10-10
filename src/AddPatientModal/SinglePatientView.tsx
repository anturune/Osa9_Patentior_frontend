import React from 'react';


//import { Container, Table } from "semantic-ui-react";
import { List, Segment, Header, Icon } from "semantic-ui-react";
import { useStateValue } from "../state";
import axios from "axios";
import { Patient, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
//import { Icon } from "semantic-ui-react";
import GendreSymbol from "../components/GendreSymbol";
import { showSinglePatient } from "../state/reducer";
import HealthRatingBar from "../components/HealthRatingBar";
//import { assertTSNeverKeyword } from '@babel/types';

//Määritellään entry propsin tyyppi
type EntryProps = {
    entry: Entry[];
};
/*
//Määritellään diagnoosikoodin tyyppi
type DiagnosisCodesProps = {
    codes?: string[];
};
*/
/*
//Komponentti diagnoosikoodien renderöimiseksi
const DiagnosisCodes = ({ codes }: DiagnosisCodesProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ diagnoses }, dispatch] = useStateValue();
    console.log('CODES', codes);
    console.log('DIAGNOSES', diagnoses);
    if (codes != undefined) {
        return (
            <div>
                <List bulleted>
                    {codes.map((code: string) => <List.Item key={code}>{code} {diagnoses[code].name}</List.Item>)}
                </List>
            </div>);
    }
    return null;
};
*/
/*
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
*/




//Komponentti Entryn renderöimiseksi
const Entries = ({ entry }: EntryProps) => {
    console.log('ENTRY', entry);
    if (entry != undefined) {
        return (
            <div>
                <List>
                    {entry.map((entry: Entry) => <List.Item key={entry.id}>
                        <EntryDetails entry={entry}></EntryDetails>
                    </List.Item>)}
                </List>
            </div>);
    }
    return null;
};

type HospitalEntryProps = {
    hospitalityEntry: HospitalEntry
};

const HospitalEntriessit = (entry: HospitalEntryProps) => {
    if (entry != undefined) {
        return (
            <Segment>
                <Header as='h4'>{entry.hospitalityEntry.date} <Icon name='hospital'></Icon>
                </Header>
                <>{entry.hospitalityEntry.description}</>
            </Segment>);
    }
    return null;
};

type OccupationalHealthcareProps = {
    occupationalHealthcareEntry: OccupationalHealthcareEntry
};

const OccupationalHealthcareEntryt = (entry: OccupationalHealthcareProps) => {
    if (entry != undefined) {
        return (
            <Segment>
                <Header as='h4'>{entry.occupationalHealthcareEntry.date} <Icon name='stethoscope'></Icon>
                </Header>
                <>{entry.occupationalHealthcareEntry.description}</>

            </Segment>);
    }
    return null;
};

type HealthCheckProps = {
    healthCheckEntry: HealthCheckEntry
};

const HealthCheckEntryt = (entry: HealthCheckProps) => {
    if (entry != undefined) {
        return (
            <Segment>
                <Header as='h4'>{entry.healthCheckEntry.date} <Icon name='user md'></Icon>
                </Header>
                <>{entry.healthCheckEntry.description}</>
                <HealthRatingBar showText={false} rating={entry.healthCheckEntry.healthCheckRating} />
            </Segment>);
    }
    return null;
};


const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    if (entry != undefined || entry != null) {
        switch (entry.type) {
            case "Hospital":
                return <HospitalEntriessit hospitalityEntry={entry}></HospitalEntriessit>;
            case "OccupationalHealthcare":
                return <OccupationalHealthcareEntryt occupationalHealthcareEntry={entry}></OccupationalHealthcareEntryt>;
            case "HealthCheck":
                return <HealthCheckEntryt healthCheckEntry={entry}></HealthCheckEntryt>;
            default:
                return null;
        }
    }
    return null;
};



//Päivitetään "effect"-hookilla "state" yksittäisen potilaan ja diagnoosien osalta haetaan "useParams":lla 
//potilaan "id" URL:sta
export const SinglePatientVieweri = () => {
    //console.log('EKA LOCAL STORAGE', JSON.parse(localStorage.getItem('patient') || '{}'));
    //console.log('TULEEKO TÄNNEkkäänkö');
    const [{ singlePatient }, dispatch] = useStateValue();
    //id "useParams":lla "url":sta
    const { id } = useParams<{ id: string }>();
    //Haetaan "effect hookilla" käyttäjä ja kaikki diagnoosit backendistä
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

    /*
        let patientJson: any  = JSON.parse(localStorage.getItem('patient')|| '{}');
        let patientti: Patient = <Patient> patientJson;
    */

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
    </div>
    );
};

export default SinglePatientVieweri;