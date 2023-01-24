import React from 'react'
import Weather from './Weather'

const Country = ({country}) => {
    return (
      <>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <>
          {country.languages.map((language,i) => <li key={i}>{language.name}</li>)}
        </>
        <br/>
        <img src={country.flag} width="570" height="340" alt={`${country.name}'s flag'`}/>
        <Weather country={country}/>
      </>
    )
} 

export default Country