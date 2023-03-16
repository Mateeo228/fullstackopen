import React from 'react';
import { useState, useEffect } from 'react';
import { Diary } from './types';
import { getAllDiaries } from './services/diaryService';
import Entries from './components/Entries';
import EntryForm from './components/EntryForm';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])
  
  useEffect( () => {
    getAllDiaries().then( data => setDiaries(data))
  }, [])

  return (
    <div>
      <EntryForm diaries={diaries} handleSetDiaries={setDiaries}/>
      <h2>Diary entries</h2>
      <Entries diaries={diaries}/>
    </div>
  )
}

export default App;
