import React, { useState , useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([{}])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ error, setError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    var containsName = persons.some(elem => {
      return JSON.stringify(nameObject.name) === JSON.stringify(elem.name);
    })

    var containsObject = persons.some(elem => {
      return (
        (JSON.stringify(nameObject.number) === JSON.stringify(elem.number)) &&
        (JSON.stringify(nameObject.name) === JSON.stringify(elem.name))
      )
    })

    if(containsObject){
      alert(`${newName} and ${newNumber} are already added to phonebook`)
    }
    else if(containsName){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const p = persons.find(p => p.name === newName)
        personService
          .update(p.id,nameObject)
          .then(personReturned => {
            setPersons(persons.map(person => person.id !== p.id ? person : personReturned))
            setNewName('')
            setNewNumber('')
          })
          .then(success => {
            setError(false)
            setMessage(
              `${newName}'s old number replaced with ${newNumber}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(err => {
            setError(true)
            setMessage(
              `Information of ${newName} has already been removed from the server`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== p.id))
          })
      }
    }
    else{
      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .then(success => {
        setError(false)
        setMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = newFilter === ''
   ? persons
   : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleDeleteNameOf = (id,name) => {
    if(window.confirm(`Delete ${name}?`)){
      personService
        .deleteName(id)
        .then(deletePerson => setPersons(persons.filter(person => person.id !== id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter filter={newFilter} change={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonsForm 
        addName={addName} 
        newName={newName} nameChange={handleNameChange} 
        newNumber={newNumber} numberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDeleteNameOf={handleDeleteNameOf}/>
    </div>
  )
}

export default App;
