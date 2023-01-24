import React from 'react'

const Filter = (props) => 
    <>
    find countries
        <input 
        value={props.filter}
        onChange={props.change}
        />
    </>

export default Filter;