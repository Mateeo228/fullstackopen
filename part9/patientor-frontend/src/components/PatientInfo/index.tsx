import { Patient } from "../../types";
import { useState } from 'react';
import { useParams } from 'react-router';
import patientService from '../../services/patients';

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

  return(
    <div>
      <h2>{patient?.name}</h2>
      <p>
        Gender: {patient?.gender} <br></br>
        Ssn: {patient?.ssn} <br></br>
        Occupation: {patient?.occupation}
      </p>
    </div>
  )
}

export default PatientInfo;