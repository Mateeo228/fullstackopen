import { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const Part = ( { part } : PartProps) => {
  switch (part.kind) {
    case 'basic':
      return (
          <p>
            <strong>{part.name} {part.exerciseCount}</strong>
            <br></br>
            <em>{part.description}</em>
          </p>
        )
    case 'group':
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong>
          <br></br>
          Project exercises: {part.groupProjectCount}
        </p>
      )
    case 'background':
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong>
          <br></br>
          <em>{part.description}</em>
          <br></br>
          Background Material: {part.backroundMaterial}
        </p>
      )
    case 'special':
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong>
          <br></br>
          <em>{part.description}</em>
          <br></br>
          Required Skills: {part.requirements.map( (r: string) => r ).join(", ")}
        </p>
      )
  }
}

export default Part;