import { useState } from 'react';
import { Entry, Diagnosis } from "../../types"
import diagnoseService from "../../services/diagnoses";
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
}

export default Entries;