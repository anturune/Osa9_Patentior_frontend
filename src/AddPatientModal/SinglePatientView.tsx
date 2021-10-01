import React from 'react';
//import { Patient } from "../types";
import { Container, Table } from "semantic-ui-react";
import { useStateValue } from "../state";
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
//import { Icon } from "semantic-ui-react";
import GendreSymbol from "../components/GendreSymbol";
//import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";



//Päivitetään "effect"-hookilla "state" ja haetaan "useParams":lla id URL:sta
export const SinglePatientVieweri = () => {
    console.log('EKA LOCAL STORAGE', JSON.parse(localStorage.getItem('patient') || '{}'));
    //console.log('TULEEKO TÄNNEkkäänkö');
    const [{ patients }, dispatch] = useStateValue();

    //Haetaan yksittäinen potilas kannasta
    //id "useParams":lla
    const { id } = useParams<{ id: string }>();
    //Haetaan "effect hookilla" käyttäjä backendistä
    React.useEffect(() => {
        //console.log('USER ID URL:STA', id);
        const fetchSinglePatient = async () => {
            try {
                const { data: singlePatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                //console.log('SINGLE PATIENT', singlePatient);
                dispatch({ type: "SHOW_SINGLE_PATIENT", payload: singlePatient });
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


    return (<div className="App">
        <Container textAlign="center">
            <h3>Patient details</h3>
        </Container>
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Nametus</Table.HeaderCell>
                    <Table.HeaderCell>Genderetys</Table.HeaderCell>
                    <Table.HeaderCell>Occupationist</Table.HeaderCell>
                    <Table.HeaderCell>SSN</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {Object.values(patients).map((patient: Patient) => (
                    <Table.Row key={patient.id}>
                        <Table.Cell>{patient.name}</Table.Cell>
                        <Table.Cell><GendreSymbol gendre={patient.gender} /></Table.Cell>
                        <Table.Cell>{patient.occupation}</Table.Cell>
                        <Table.Cell>{patient.ssn}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </div>
    );
};

/*
export const SinglePatientView = () => {

            console.log('TULEEKO SINGLE PATIENT VIEWIIN');
        return (<div className="App">
            <Container textAlign="center">
                <h3>Patient list</h3>
            </Container>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Gender</Table.HeaderCell>
                        <Table.HeaderCell>Occupation</Table.HeaderCell>
                        <Table.HeaderCell>Health Rating</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

            </Table>
        </div>
        );
};
        */
export default SinglePatientVieweri;