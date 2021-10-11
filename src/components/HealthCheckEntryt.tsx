import React from 'react';
import { Segment, Header, Icon } from "semantic-ui-react";
import { HealthCheckEntry } from "../types";
import HealthRatingBar from "../components/HealthRatingBar";
import DiagnosisCodes from "../components/DiagnosesCodes";

//Propsien tyyppimäärittely ks. "types.ts" ja "export type Entry"
export type HealthCheckProps = {
    healthCheckEntry: HealthCheckEntry
};
//Renderöimiseen ks. backendistä patients datan sisältö "patients.ts"
export const HealthCheckEntryt = (entry: HealthCheckProps) => {
    if (entry != undefined) {
        return (
            <Segment>
                <Header as='h4'>{entry.healthCheckEntry.date} <Icon name='user md'></Icon>
                </Header>
                <>{entry.healthCheckEntry.description}</>
                <DiagnosisCodes codes={entry.healthCheckEntry.diagnosisCodes}></DiagnosisCodes>
                <HealthRatingBar showText={false} rating={entry.healthCheckEntry.healthCheckRating} />
            </Segment>);
    }
    return null;
};

export default HealthCheckEntryt;