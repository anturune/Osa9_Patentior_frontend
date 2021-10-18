export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

//--------------------------------------
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

//---------------------------------------
export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}
//---------------------------------------

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;

}
//---------------------------------------


export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// Define special omit for unions
export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;


export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}
//Jos halutaan palauttaa vain halutut kentät, on kaksi vaihtoehtoa
//"Omit"-jolle kerrotaan mikä field jää pois tai "Pick", että mitkä
//kentät poimitaan mukaan
//export type PatientDetails = Omit<Patient, 'ssn'>;
export type PatientDetails = Omit<Patient, 'ssn' | 'entries'>;
//export type PatientDetails = Pick<Patient, 'id' | 'name' | 'dateOfBirth'>;

//Uuden potilaan luonti. Jätetään id pois, jotta voidaan luoda uusi
export type NewPatient = Omit<Patient, 'id'>;

//Käytetään enum:a, koska nämä ovat muuttumattomia arvoja
//ja voidaan hödyntää sellaisenaan
//HUOM! Enum:n käyttö vaatii datan jalostamista eikä voida
//enää ottaa dataa vastaan ".json" -muotoisena
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

//-------------------------------------------------------------------------------
/*
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}
*/
//-------------------------------------------------------------------------------