import React, { createContext, useContext, useReducer } from "react";
import { Icon } from "semantic-ui-react";
import { Patient } from "../types";

import { Action } from "./reducer";
//import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
};

const initialState: State = {
  patients: {}
};

export type IconType = {
  gender: Icon
};
/*
const initialIconState: IconType = {
  gender: Icon: name='mars'
};

export const IconContext = createContext << Icon name = {} /> > ([
  initialState,
  () => initialState
]);
*/
/*
export const setPatientList = (patientList: Patient[]) => {
  console.log('TULEEKO SETPATIENTLISTIIN');
  return {
    ...initialState,
    patients: {
      ...initialState.patients,
      patientList
    }
  };
*/

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

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
