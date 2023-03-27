import { Gender, NewPatient, Entry, NewEntry, NewBaseEntry, Diagnose, HealthCheckRating, Discharge, SickLeave } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isEntry = (param: object): param is Entry => {
  return 'type' in param; 
};

const isEntries = (param: Array<unknown>): param is Entry[] => {
    return param.every( (entry: unknown) => entry && typeof entry === 'object' && isEntry(entry));
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !(Array.isArray(entries)) || !isEntries(entries)){
    throw new Error('Incorrect or missing entries: ' + entries);
  }
  return entries;
};

const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    console.log(object);
    return [] as Array<Diagnose['code']>;
  }

  return object.diagnosisCodes as Array<Diagnose['code']>;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }

  return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employerName');
  }

  return employerName;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(v => Number(v)).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(Number(healthCheckRating))) {
      throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
  }
  return Number(healthCheckRating);
};

const isDischarge = (param: object): param is Discharge => {
  return 'date' in param && 'criteria' in param && isString(param.date) && isString(param.criteria);
};

const parseDischarge = (object: unknown): Discharge =>  {
  if (!object || typeof object !== 'object' || !isDischarge(object)) {
    throw new Error('Incorrect or missing discharge object: ' + object);
  }

  return object;
};

const isSickLeave = (param: object): param is SickLeave => {
  return 'startDate' in param && 'endDate' in param && isString(param.startDate) && isString(param.endDate);
};

const parseSickLeave = (object: unknown): SickLeave =>  {
  if (!object || typeof object !== 'object' || !isSickLeave(object)) {
    throw new Error('Incorrect or missing stickLeave: ' + object);
  }

  return object;
};

const toNewEntry = (object: unknown): NewEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('type' in object && 'description' in object && 'date' in object && 'specialist' in object){

    const newBaseEntry: NewBaseEntry = {
      date: parseDate(object.date),
      description: parseDescription(object.description),
      specialist: parseSpecialist(object.specialist)
    };

    if ('diagnosisCodes' in object){
      newBaseEntry['diagnosisCodes'] = parseDiagnosisCodes(object);
    }

    switch(object.type) {
      case 'Hospital':
        console.log(object);
        if('discharge' in object){
          const newEntry: NewEntry = {
            ...newBaseEntry,
            type: object.type,
            discharge: parseDischarge(object.discharge)
          };
          console.log(newEntry);
          return newEntry;
        }
        throw new Error("Incorrect or missing data");
      
      case 'HealthCheck':
        console.log(object);
        if('healthCheckRating' in object){
          const newEntry: NewEntry = {
            ...newBaseEntry,
            type: object.type,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
          };
          return newEntry;
        }
        throw new Error("Incorrect or missing data");

      case 'OccupationalHealthcare':
        console.log(object);
        if('employerName' in object){
          const newEntry: NewEntry = {
            ...newBaseEntry,
            type: object.type,
            employerName: parseEmployerName(object.employerName)
          };

          if ('sickLeave' in object){
            newEntry['sickLeave'] = parseSickLeave(object.sickLeave);
          }

          return newEntry;
        }
        throw new Error("Incorrect or missing data");

      
    }
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default { toNewPatient, toNewEntry };