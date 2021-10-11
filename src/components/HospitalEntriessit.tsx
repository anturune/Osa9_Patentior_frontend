import React from 'react';
import { HospitalEntry } from "../types";
import { Segment, Header, Icon } from "semantic-ui-react";
import DiagnosisCodes from "../components/DiagnosesCodes";

//Propsien tyyppimäärittely ks. "types.ts" ja "export type Entry"
export type HospitalEntryProps = {
    hospitalityEntry: HospitalEntry
};
//Renderöimiseen ks. backendistä patients datan sisältö "patients.ts"
const HospitalEntriessit = (entry: HospitalEntryProps) => {
    if (entry != undefined) {
        return (
            <Segment>
                <Header as='h4'>{entry.hospitalityEntry.date} <Icon name='hospital'></Icon>
                </Header>
                <>{entry.hospitalityEntry.description}</>
                <DiagnosisCodes codes={entry.hospitalityEntry.diagnosisCodes}></DiagnosisCodes>
            </Segment>);
    }
    return null;
};

export default HospitalEntriessit;