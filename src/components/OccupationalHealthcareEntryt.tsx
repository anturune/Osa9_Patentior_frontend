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
    console.log('KÄYKÖ TÄÄLLÄ', entry);
    if (entry != undefined) {
        return (
            <div>
                <Segment>
                    <Header as='h4'>{entry.occupationalHealthcareEntry.date} <Icon name='stethoscope'></Icon></Header>
                    <div>{entry.occupationalHealthcareEntry.description}</div><br></br><br></br>
                    
                    <b>Specialist:</b><br></br>
                    <>{entry.occupationalHealthcareEntry.specialist}</><br></br><br></br>

                    <b>Employer name:</b><br></br>
                    <>{entry.occupationalHealthcareEntry.employerName}</><br></br><br></br>
                    
                    <b>Diagnoses:</b><br></br>
                    <DiagnosisCodes codes={entry.occupationalHealthcareEntry.diagnosisCodes}></DiagnosisCodes><br></br>

                    <b>Sick leave:</b><br></br>
                    <>Start date: {entry.occupationalHealthcareEntry.sickLeave?.startDate}</><br></br>
                    <>End date: {entry.occupationalHealthcareEntry.sickLeave?.endDate} </>
                </Segment>
            </div>);
    }
    return null;
};

export default OccupationalHealthcareEntryt;