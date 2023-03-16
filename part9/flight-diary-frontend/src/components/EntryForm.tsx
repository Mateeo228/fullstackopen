import { useState } from "react";
import { createEntry } from "../services/diaryService";
import { Visibility, Weather, Diary } from "../types";
import Notification from "./Notification";

interface FormProps {
  diaries: Diary[];
  handleSetDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
}

const EntryForm = ({handleSetDiaries, diaries}: FormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');

  const [notification, setNotification] = useState(null);

  const addForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createEntry({
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment,
    }).then( data => {
      handleSetDiaries(diaries.concat(data));
      setComment('');
    }).catch(error => {
      setNotification(error.response.data);
      setTimeout( () => setNotification(null), 5000);
    })
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <Notification notification={notification} />
      <form onSubmit={addForm}>
        <div>
          Date:
          <input 
            type='date'
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          Visibility:
          <input type='radio' id='great' name='visibility' onChange={() => setVisibility(Visibility.Great)} checked/>
          <label htmlFor='great'>Great</label>
          <input type='radio' id='good' name='visibility' onChange={() => setVisibility(Visibility.Good)}/>
          <label htmlFor='good'>Good</label>
          <input type='radio' id='ok' name='visibility' onChange={() => setVisibility(Visibility.Ok)}/>
          <label htmlFor='ok'>Ok</label>
          <input type='radio' id='poor' name='visibility' onChange={() => setVisibility(Visibility.Poor)}/>
          <label htmlFor='poor'>Poor</label>
        </div>
        <div>
          Weather:
          <input type='radio' id='sunny' name='weather' onChange={() => setWeather(Weather.Sunny)} checked/>
          <label htmlFor='sunny'>Sunny</label>
          <input type='radio' id='rainy' name='weather' onChange={() => setWeather(Weather.Rainy)}/>
          <label htmlFor='rainy'>Rainy</label>
          <input type='radio' id='cloudy' name='weather' onChange={() => setWeather(Weather.Cloudy)}/>
          <label htmlFor='cloudy'>Cloudy</label>
          <input type='radio' id='stormy' name='weather' onChange={() => setWeather(Weather.Stormy)}/>
          <label htmlFor='stormy'>Stormy</label>
          <input type='radio' id='windy' name='weather' onChange={() => setWeather(Weather.Windy)}/>
          <label htmlFor='windy'>Windy</label>
        </div>
        <div>
          Comment:
          <input 
            type='text'
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default EntryForm;