import React from 'react'

const PersonsForm = (props) => {
    return (
        <form onSubmit={props.addName}>
        <div>
            name: <input 
            value={props.newName}
            onChange={props.nameChange}
            />
        </div>
        <div>
            number: <input
            value={props.newNumber}
            onChange={props.numberChange}
            />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
        </form>
    )
}

export default PersonsForm;