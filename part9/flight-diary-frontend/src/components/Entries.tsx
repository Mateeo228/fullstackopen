import { Diary } from "../types";

interface Diaries {
  diaries: Diary[];
}

const Entries = ({diaries}:Diaries) => {
  return(
    <div>
      {diaries.map( (entry: Diary, i: number) => 
        <div key={i}>
          <h3>{entry.date}</h3>
          <p>
            Visibility: {entry.visibility} <br></br>
            Weather: {entry.weather} <br></br>
            {entry.comment}
          </p>
        </div>
      )}
    </div>
  )
}

export default Entries;