import { Diagnosis, HospitalEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Diagnoses from "./Diagnoses";

interface HospitalProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const Hospital = ({ entry, diagnoses }: HospitalProps) => {
  const HospitalStyle = {
    padding: 10,
    border: 'solid',
    borderColor: 'green',
    borderWidth: 2,
    marginBottom: 5,
    borderRadius: 10
  }
  return(
    <p style={HospitalStyle}>
      {entry.date} <LocalHospitalIcon /> <br></br>
      <em>{entry.description}</em> <br></br>
      <Diagnoses diagnosesList={diagnoses} diagnosesCodes={entry.diagnosisCodes} /> <br></br>
      diagnose by {entry.specialist}
    </p>
  )
}

export default Hospital;