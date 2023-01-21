import React from 'react'

const Filter = (props) => 
    <>
    filter shown with 
        <input 
        value={props.filter}
        onChange={props.change}
        />
    </>

export default Filter;