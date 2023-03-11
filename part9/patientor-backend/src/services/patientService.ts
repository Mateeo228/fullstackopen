import patients from '../../data/patients';
import { Patient, NonSensitivePatient } from '../types';

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

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose,
  getNonSensitiveEntries
};