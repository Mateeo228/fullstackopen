import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
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

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries
};