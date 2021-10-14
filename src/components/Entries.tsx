import React from 'react';
import { Entry } from "../types";
import { List } from "semantic-ui-react";
import HospitalEntriessit from "../components/HospitalEntriessit";
import OccupationalHealthcareEntryt from "../components/OccupationalHealthcareEntryt";
import HealthCheckEntryt from "../components/HealthCheckEntryt";


//Propsien tyyppimäärittely ks. "types.ts" ja "export type Entry"
type EntryProps = {
    entry: Entry[];
};

//Komponentti Entryn renderöimiseksi
const Entries = ({ entry }: EntryProps) => {
    //console.log('ENTRY', entry);
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
//Yksittäisen entry renderöimiseen, joka ohjataa "casella" sopivaan komponenttiin yksityiskohtaiseen
//renderöimiseen
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


export default Entries;