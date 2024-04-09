const Countries = ({filtered, toggleShow, showCountry, showButton}) => {
    const length = filtered.length
    if (showButton) {
        const foundCountry = filtered.filter(country => country.name.common === showCountry)
        return (
            <div>
            <h1>{foundCountry[0].name.common}</h1>
            <p>capital {foundCountry[0].capital}</p>
            <p>area {foundCountry[0].area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(foundCountry[0].languages).map(language =>
                     <li key={language}>{language}</li>)}
            </ul>
            <img src={foundCountry[0].flags.png}></img>
            </div>
        )
    }
    if (length === 250 || length === 0) { return }
    if (length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }

    if (length === 1) {
        const country = filtered[0]
        return (
            <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(language =>
                     <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png}></img>
            </div>
        )
    }

    return (
        filtered.map(country =>
             <p key={country.name.common}>{country.name.common}<button onClick={() => 
                toggleShow(country.name.common)}>show</button></p>)
    )
}

export default Countries