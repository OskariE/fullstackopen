import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

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
      name: newName
    }
    setPersons(persons.concat(newPerson)) 
    setNewName("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
          onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )

}

export default App