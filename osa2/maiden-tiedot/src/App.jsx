import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import countriesService from './services/countries'
import Countries from './components/Countries'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [showButton, setShowButton] = useState(false)
  const [showCountry, setShowCountry] = useState('')

  useEffect(() => {
    countriesService.getAll().then( response => {
      setCountries(response.data)
    })
  }, [])

  const toggleShow = (country) => {
    setShowButton(true)
    setShowCountry(country)
  }

  const filtered = countries.filter( country => 
    country.name.common.toLowerCase().includes(search.toLowerCase()) === true)
  
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setShowButton(false)
  }

  return (
    <div>
      <Filter handler={handleSearchChange}/>
      <Countries filtered={filtered} toggleShow={toggleShow}
       showCountry={showCountry} showButton={showButton}/>
    </div>
  )
}
export default App
