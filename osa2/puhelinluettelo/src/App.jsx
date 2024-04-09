import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'
import ErrorMessage from './components/ErrorMessage'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  })

  const deletePerson = (id) => {
    const foundPerson = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${foundPerson.name}?`)) {
      personService.remove(id).then(
        response => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(`${foundPerson.name} has been deleted`)
          setTimeout(() => {setMessage(null)}, 3000)
        }
      ).catch(error => {
        setErrorMessage(`Something went wrong...`)
        setTimeout(() => {setErrorMessage(null)}, 3000)
      })
    }
  }

  const checkName = () => {
    const names = persons.map(person => person.name)
    return names.includes(newName)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (checkName() === true) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const found = persons.find(person => person.name === newName)
        const updated = {...found, number: newNumber}

        personService.update(updated.id, updated).then(
          response => {
            setPersons(persons.map(person =>
               person.id !== updated.id ? person : response))
          }
        ).catch(error => {
          setErrorMessage(`${newName} was already removed from the server`)
          setTimeout(() => {setErrorMessage(null)}, 3000)
        })
        setMessage(`${newName} has been updated`)
        setTimeout(() => {setMessage(null)}, 3000)

        setNewName("")
        setNewNumber("")
        return
      } 
      else {return}
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    personService.create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))

        setMessage(`${newName} has been added to the phonebook`)
        setTimeout(() => {setMessage(null)}, 3000)

        setNewName("")
        setNewNumber("")
      }).catch(error => {
        setErrorMessage(`Something went wrong...`)
        setTimeout(() => {setErrorMessage(null)}, 3000)
      })
  }
  
  const peopleToShow = showAll ? 
  persons : persons.filter(person =>
     person.name.toLowerCase().includes(search.toLowerCase()) === true)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    if(event.target.value !== '') {
      setShowAll(false)
    }
  }

  return (
    <div>
      <Filter value={search} handleSearchChange={handleSearchChange}/>
      <h2>Phonebook</h2>
      <ErrorMessage errorMessage={errorMessage}/>
      <Notification message={message}/>
      <PersonForm add={addPerson} name={newName} 
        handleName={handleNameChange} 
        handleNumber={handleNumberChange}
        number={newNumber}/>
      <h2>Numbers</h2>
      {peopleToShow.map(person => 
        <Persons key={person.id} person={person} 
        deletePerson={() => deletePerson(person.id)}/>)}
    </div>
  )

}

export default App