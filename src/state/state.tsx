import React, { createContext, useContext, useReducer } from "react";
import { Patient, Diagnosis, Gender } from "../types";

import { Action } from "./reducer";

//Application state, kaikille tarvittaville oma "lohkonsa"
export type State = {
  patients: { [id: string]: Patient }
  singlePatient: Patient
  diagnoses: { [code: string]: Diagnosis };
};
//Initial staten määrittely
const initialState: State = {
  patients: {},
  singlePatient: {
    id: '',
    dateOfBirth: '',
    name: '',
    ssn: '',
    gender: Gender.Other,
    occupation: '',
    entries: []
  },
  diagnoses: {}
};
//Context, joka mahdollistaa "application state":n käytön missä tahansa komponentissa
export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);
//Provider mahdollistaa että state ja dispatch on käytössä kaikille komponenteille
type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
