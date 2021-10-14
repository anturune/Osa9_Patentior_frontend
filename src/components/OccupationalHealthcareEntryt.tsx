import React from 'react';
import { Segment, Header, Icon } from "semantic-ui-react";
import { OccupationalHealthcareEntry } from "../types";
import DiagnosisCodes from "../components/DiagnosesCodes";



//Propsien tyyppimäärittely ks. "types.ts" ja "export type Entry"
export type OccupationalHealthcareProps = {
    occupationalHealthcareEntry: OccupationalHealthcareEntry
};
//Renderöimiseen ks. backendistä patients datan sisältö "patients.ts"
const OccupationalHealthcareEntryt = (entry: OccupationalHealthcareProps) => {
    console.log('KÄYKÖ TÄÄLLÄ');
    if (entry != undefined) {
        return (
            <Segment>
                <Header as='h4'>{entry.occupationalHealthcareEntry.date} <Icon name='stethoscope'></Icon>
                </Header>
                <>{entry.occupationalHealthcareEntry.description}</>
                <DiagnosisCodes codes={entry.occupationalHealthcareEntry.diagnosisCodes}></DiagnosisCodes>
            </Segment>);
    }
    return null;
};

export default OccupationalHealthcareEntryt;