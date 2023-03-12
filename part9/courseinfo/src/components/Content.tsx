interface CoursePart {
  name: string,
  exerciseCount: number
}

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = ({ courseParts } : ContentProps ) => {
  return(
    <div>
      {courseParts.map( (part: CoursePart, i: number) => <p key={i}>{part.name}</p>)}
    </div>
  )
}

export default Content;