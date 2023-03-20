import { useState } from 'react';
import { Entry, Diagnosis } from "../../types"
import Diagnoses from "./Diagnoses";
import diagnoseService from "../../services/diagnoses";
import Hospital from './Hospital';
import OccupationalEntry from './OccupationalEntry';
import HealthCheck from './HealthCheck';
import { EntryDetails } from './EntryDetails';

interface EntriesProps {
  entries: Entry[];
}

const Entries = ({ entries } : EntriesProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const fetchDiagnoses = async () =>{
    const diagnoses = await diagnoseService.getAll();
    setDiagnoses(diagnoses);
  };
  void fetchDiagnoses();

  return (
    <div>
      {entries.map( (entry, i) => <EntryDetails key={i} entry={entry} diagnoses={diagnoses}/>)}
    </div>
  )

  // return (
  //   <div>
  //     {entries.map( (entry, i) => 
  //       <div key={i}>
  //         <p>
  //           {entry.date} <em>{entry.description}</em>
  //         </p>
  //         <Diagnoses diagnosesCodes={entry.diagnosisCodes} diagnosesList={diagnoses} />
  //       </div>  
  //     )}
  //   </div>
  // )
}

export default Entries;