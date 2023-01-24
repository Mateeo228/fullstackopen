import React, {useState, useEffect} from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const countriesToShow = newFilter === ''
    ? countries
    : countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  const showCountry = (country) => setNewFilter(`${country}`)

  return(
    <>
      <Filter filter={newFilter} change={handleNewFilter}/>
    <br/>
      <Countries countriesToShow={countriesToShow} showCountry={showCountry}/>
    </>

  )
}

export default App;
