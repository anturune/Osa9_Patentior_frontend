import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
    | {
        type: "SET_PATIENT_LIST";
        data: Patient[];
    }
    /*
    | {
        type: "ADD_PATIENT";
        data: Patient;
    };
    */
    | {
        type: "SHOW_SINGLE_PATIENT";
        data: Patient;
    }
    | {
        type: "SET_DIAGNOSE_LIST";
        data: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
    //console.log('STATE', state.patients, 'ACTION PAYLOAD', action.data);
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
        /*
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
         */
        case "SHOW_SINGLE_PATIENT":
            return {
                ...state,
                singlePatient: action.data,
            };
        case "SET_DIAGNOSE_LIST":
            return {
                ...state,
                diagnoses: {
                    ...action.data.reduce(
                        (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
                        {}
                    ),
                    ...state.diagnoses
                }
            };
        default:
            return state;

    }

};
//Action-creator potilaslistan näyttämiseksi
export const setPatientList = (patientList: Patient[]): Action => {
    //console.log('TULEEKO SETPATIENTLISTIIN');
    return {
        type: "SET_PATIENT_LIST",
        data: patientList
    };
};

//Action creator yksittäisen potilaan näyttämiseksi
export const showSinglePatient = (singlePatient: Patient,): Action => {
    console.log('TULEEKO SINGLE PATIENTTIIN');
    return {
        type: "SHOW_SINGLE_PATIENT",
        data: singlePatient,


    };
};
//Action-creator potilaslistan näyttämiseksi
export const setDiagnosisList = (diagnoseList: Diagnosis[]): Action => {
    //console.log('TULEEKO SETPATIENTLISTIIN');
    return {
        type: "SET_DIAGNOSE_LIST",
        data: diagnoseList
    };
};
