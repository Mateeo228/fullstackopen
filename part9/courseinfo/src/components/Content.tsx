import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = ({ courseParts } : ContentProps ) => {
  return(
    <div>
      {courseParts.map( (part: CoursePart, i: number) => 
        <div key={i}>
          <Part part={part}/>
        </div>
      )}
    </div>
  )
}

export default Content;