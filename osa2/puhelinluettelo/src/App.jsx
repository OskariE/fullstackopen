import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)


  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  })

  const deletePerson = (id) => {
    const findPerson = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${findPerson.name}?`)) {
      personService.remove(id).then(
        response => {
          setPersons(persons.filter(person => person.id !== id))
        }
      )}
  }

  const checkName = () => {
    const names = persons.map(person => person.name)
    console.log(names)
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
        )
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
        setNewName("")
        setNewNumber("")
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