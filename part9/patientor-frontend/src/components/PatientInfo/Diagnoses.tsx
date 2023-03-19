import { Diagnosis } from "../../types";

interface DiagnosesProps {
  diagnosesList: Diagnosis[];
  diagnosesCodes?: Array<Diagnosis['code']>;
}

const Diagnoses = ({ diagnosesList, diagnosesCodes }: DiagnosesProps) => {
  if(!diagnosesCodes){
    return null;
  }

  return(
    <ul>
      {diagnosesCodes.map( (diagnose, i) => {
        const fetchDiagnose = diagnosesList.find( d => d.code === diagnose);
        if (!fetchDiagnose){
          return null;
        }
        return (
          <li key={i}>
            {diagnose} {fetchDiagnose.name}
          </li>
        )
      })}
    </ul>
  )
}

export default Diagnoses;