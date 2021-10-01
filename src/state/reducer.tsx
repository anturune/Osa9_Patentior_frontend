import { State } from "./state";
import { Patient } from "../types";

export type Action =
    | {
        type: "SET_PATIENT_LIST";
        data: Patient[];
    }
    | {
        type: "ADD_PATIENT";
        data: Patient;
    }
    | {
        type: "SHOW_SINGLE_PATIENT";
        data: Patient;
    };

export const reducer = (state: State, action: Action): State => {
    console.log('STATE', state.patients, 'ACTION PAYLOAD',action.data);
    switch (action.type) {
        case "SET_PATIENT_LIST":
            return {
                ...state,
                patients: {
                    ...action.data.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {}
                    ),
                    ...state.patients
                }
            };
        case "ADD_PATIENT":
            console.log('TULEEKO ADD PATIENTTIIM');
            return {
                ...state,
                patients: {
                    ...state.patients,
                    //[action.payload.id]: action.payload
                    [action.data.id]: action.data
                }
            };

        case "SHOW_SINGLE_PATIENT":
            return {
                ...state,
                //patients: { [action.payload.id]: action.payload }
                patients: { [action.data.id]: action.data }
            };


        default:
            return state;
    }
};

export const setPatientList = (patientList: Patient[]) => {
    return {
        type: 'SET_PATIENT_LIST',
        data: {
            patientList
        }
    };
};