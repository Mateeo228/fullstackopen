import React from 'react'

const Persons = ({personsToShow, handleDeleteNameOf}) =>{
    return (
      <>
      {personsToShow.map((person,i) => 
        <div key={i}> 
          {person.name} {person.number} 
          <button onClick={() => handleDeleteNameOf(person.id,person.name)}>
            delete
          </button>
        </div>
      )}
     </>
    )
} 

export default Persons;