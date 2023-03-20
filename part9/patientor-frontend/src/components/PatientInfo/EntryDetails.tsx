import { Entry, Diagnosis } from "../../types";
import Hospital from './Hospital';
import OccupationalEntry from './OccupationalEntry';
import HealthCheck from './HealthCheck';

export const EntryDetails: React.FC<{ entry: Entry, diagnoses: Diagnosis[]}> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} diagnoses={diagnoses}/>
    case 'OccupationalHealthcare':
      return <OccupationalEntry entry={entry} diagnoses={diagnoses}/>
    case 'HealthCheck':
      return <HealthCheck entry={entry} diagnoses={diagnoses}/>
    default:
      return null;
  }
}