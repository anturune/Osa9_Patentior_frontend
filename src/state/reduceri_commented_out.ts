import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "SHOW_SINGLE_PATIENT";
    payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  console.log('STATE', state.patients, 'ACTION PAYLOAD', action.payload);
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
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
          [action.payload.id]: action.payload
        }
      };

    case "SHOW_SINGLE_PATIENT":
      return {
        ...state,
        patients: { [action.payload.id]: action.payload }
      };


    default:
      return state;
  }
};
