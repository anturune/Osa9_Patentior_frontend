import React from 'react';
import { List } from "semantic-ui-react";
import { useStateValue } from "../state";
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import GendreSymbol from "../components/GendreSymbol";
import Entries from "../components/Entries";
import { showSinglePatient } from "../state/reducer";


//Päivitetään "effect"-hookilla "state" yksittäisen potilaan ja diagnoosien osalta haetaan "useParams":lla 
//potilaan "id" URL:sta
export const SinglePatientVieweri = () => {
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