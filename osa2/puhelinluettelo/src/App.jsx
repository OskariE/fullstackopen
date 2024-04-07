import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)


  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  })


  const checkName = () => {
    const names = persons.map(person => person.name)
    console.log(names)
    return names.includes(newName)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (checkName() === true) {
      alert(`${newName} is already added to the phonebook`)
      return 
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    axios.post('http://localhost:3001/persons', newPerson)
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
      <Persons people={peopleToShow}/>
    </div>
  )

}

export default App