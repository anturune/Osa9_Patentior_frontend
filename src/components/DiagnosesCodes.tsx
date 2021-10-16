import React from 'react';
import { List } from "semantic-ui-react";
import { useStateValue } from "../state";
//import { Diagnosis } from '../types';

//Määritellään diagnoosikoodin tyyppi
export type DiagnosisCodesProps = {
    codes?: string[];
};

//Komponentti diagnoosikoodien renderöimiseksi
const DiagnosisCodes = ({ codes }: DiagnosisCodesProps) => {

    const [{ diagnoses }] = useStateValue();

    //console.log('CODES', codes);
    //console.log('DIAGNOSES', diagnoses);
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

export default DiagnosisCodes;