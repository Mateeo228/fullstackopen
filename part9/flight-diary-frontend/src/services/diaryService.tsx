import axios from 'axios';
import { Diary, NewDiary } from '../types';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaries = () => {
  return axios
    .get<Diary[]>(baseUrl)
    .then(response => response.data)
}

// export const createEntry = (object: NewDiary) => {
//   return axios
//     .post<Diary>(baseUrl, object)
//     .then(response => response.data)
//     .catch( error => error.response)
// }

export const createEntry = (object: NewDiary) => {
  const request = axios.post<Diary>(baseUrl, object)
  return request.then(response => response.data)
}