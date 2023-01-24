import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({country}) => {  
    const [weather, setWeather] = useState(null)   
    const api_key = process.env.REACT_APP_API_KEY
    const lat = country.latlng[0];
    const lon = country.latlng[1];
    useEffect(() => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
        .then(response => {
          setWeather(response.data)
      })
    }, [])
    
    if(!weather){
      return null
    }
    else{
      const tempCelsius = Math.round((weather.main.temp - 273.15)*10)/10
      const weatherIcon= weather.weather[0].icon
      return(
        <>
        <h2>Weather in {country.capital}</h2>
        <p><strong>temperature:</strong> {tempCelsius} Celcius</p>
        <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={`${country.name}'s img weather'`}/> 
        <p><strong>wind:</strong> {weather.wind.speed} m/s direction {weather.wind.deg} degrees</p>
        </>
      )
    }
    
}

export default Weather