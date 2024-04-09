const Countries = ({filtered}) => {
    const length = filtered.length
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
        filtered.map(country => <p key={country.name.common}>{country.name.common}</p>)
    )
}

export default Countries