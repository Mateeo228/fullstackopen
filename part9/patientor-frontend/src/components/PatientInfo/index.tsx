import { Patient } from "../../types";
import { useState } from 'react';
import { useParams } from 'react-router';
import patientService from '../../services/patients';
import Entries from "./Entries";

const PatientInfo = () => {
  const [patient, setPatient] = useState<Patient>();
  const patientId = useParams().id;

  if (!patientId) {
    return <div>Incorrect patient ID, try again.</div>;
  } 

  const fetchPatient = async () => {
    const patient = await patientService.getPatient(patientId);
    setPatient(patient);
  };
  void fetchPatient();

  if (!patient) {
    return null;
  }

  return(
    <div>
      <h2>{patient.name}</h2>
      <p>
        Gender: {patient.gender} <br></br>
        Ssn: {patient.ssn} <br></br>
        Occupation: {patient.occupation}
      </p>
      <Entries entries={patient.entries}/>
    </div>
  )
}

export default PatientInfo;