import { Diagnosis, HealthCheckEntry, HealthCheckRating } from "../../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Diagnoses from "./Diagnoses";

interface HealthCheckProps {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheck = ({ entry, diagnoses }: HealthCheckProps) => {
  const HealthStyle = {
    padding: 10,
    border: 'solid',
    borderColor: 'green',
    borderWidth: 2,
    marginBottom: 5,
    borderRadius: 10
  }

  const healthIcon = (health: HealthCheckRating) => {
    switch(health){
      case 0:
        return <FavoriteIcon color="success"/>
      case 1:
        return <FavoriteIcon style={{ color: 'yellow' }} />
      case 2:
        return <FavoriteIcon style={{ color: 'orange' }} />
      case 3:
        return <FavoriteIcon color="action"/>
      default: 
        return null;
    }
  }

  return(
    <div style={HealthStyle}>
      {entry.date} <MedicalServicesIcon  /> <br></br>
      <em>{entry.description}</em> <br></br>
      {healthIcon(entry.healthCheckRating)} <br></br>
      <Diagnoses diagnosesList={diagnoses} diagnosesCodes={entry.diagnosisCodes} /> <br></br>
      diagnose by {entry.specialist}
    </div>
  )
}

export default HealthCheck;