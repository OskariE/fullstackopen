const Filter = ({handler}) => {
    return (
        <p>Find countries
            <input onChange={handler}></input>
        </p>
    )
}

export default Filter