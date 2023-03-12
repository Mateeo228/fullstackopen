interface CoursePart {
  name: string,
  exerciseCount: number
}

interface TotalProps {
  courseParts: CoursePart[]
}

const Total = ({ courseParts } : TotalProps ) => {
  const exercises: Array<number> = courseParts.map( (part: CoursePart) => part.exerciseCount);
  const total: number = exercises.reduce( (acum, item) => acum + item, 0);

  return(
    <p>
      Number of exercises{" "}
      {total}
    </p>
  )
}

export default Total;