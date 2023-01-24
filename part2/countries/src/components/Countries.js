import React from 'react'
import Country from './Country'
import Button from './Button'

const Countries = ({countriesToShow, showCountry}) => {
    if(countriesToShow.length > 10){
        return <>Too many matches, specify another filter</>
    }
    else if(countriesToShow.length <= 10 && countriesToShow.length > 1){
        return (
        <>
            {countriesToShow.map((country,i) => <div key={i}>{country.name} <Button country={country} showCountry={showCountry}/></div>)}
        </>
        )
    }
    else if(countriesToShow.length === 1){
        return (
        <Country country={countriesToShow[0]}/>
        )
    }
    else return ('No matches, specify another filter')
}

export default Countries