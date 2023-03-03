import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

export const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export const update = async (newObject) => {
  const blogUpdated = newObject.blogUpdated
  const id = newObject.id
  const response = await axios.put(baseUrl + `/${id}`, blogUpdated)
  return response.data
}

export const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(baseUrl + `/${id}`, config)
  return response.data
}

export default { setToken }
