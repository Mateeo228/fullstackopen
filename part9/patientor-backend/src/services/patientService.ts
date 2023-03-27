import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient, NewEntry, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = ( entry: NewPatient ): Patient => {
  const id: string = uuid();
  const newPatient = {
    id: id,
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const findyById = (id: string): Patient | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

const addEntry = ( entry: NewEntry, patient: Patient ): Entry | undefined => {
  const id: string = uuid();
  const newEntry = {
    id: id,
    ...entry
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findyById,
  addEntry
};