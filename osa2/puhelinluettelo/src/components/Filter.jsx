const Filter = ({search, handleSearchChange}) => {
    return <div>
        filter shown: <input value={search} onChange={handleSearchChange}></input>
        </div>
}

export default Filter