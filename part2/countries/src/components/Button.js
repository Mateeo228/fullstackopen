import React from 'react'

const Button = ({country, showCountry}) => {
    return (
      <button onClick={() => showCountry(country.name)}>
        show
      </button>
    )
}

export default Button