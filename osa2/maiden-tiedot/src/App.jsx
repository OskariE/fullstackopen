import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import countriesService from './services/countries'
import Countries from './components/Countries'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countriesService.getAll().then( response => {
      setCountries(response.data)
    })
  }, [])

  const filtered = countries.filter( country => 
    country.name.common.toLowerCase().includes(search.toLowerCase()) === true)
  
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <Filter handler={handleSearchChange}/>
      <Countries filtered={filtered}/>
    </div>
  )
}
export default App
