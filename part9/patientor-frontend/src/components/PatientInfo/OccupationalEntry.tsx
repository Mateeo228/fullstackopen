import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import WorkIcon from '@mui/icons-material/Work';
import Diagnoses from "./Diagnoses";

interface OccupationalProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalEntry = ({ entry, diagnoses }: OccupationalProps) => {
  const OccupationStyle = {
    padding: 10,
    border: 'solid',
    borderColor: 'green',
    borderWidth: 2,
    marginBottom: 5,
    borderRadius: 10
  }
  return(
    <p style={OccupationStyle}>
      {entry.date} <WorkIcon /> {entry.employerName}<br></br>
      <em>{entry.description}</em> <br></br>
      <Diagnoses diagnosesList={diagnoses} diagnosesCodes={entry.diagnosisCodes} /> <br></br>
      diagnose by {entry.specialist}
    </p>
  )
}

export default OccupationalEntry;