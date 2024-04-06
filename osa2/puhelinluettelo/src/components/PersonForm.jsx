const PersonForm = ({add, name, handleName, handleNumber, number}) => {
    return <form onSubmit={add}>
    <div>
      name: <input value={name}
      onChange={handleName} />
    </div>
    <div>number: <input value={number} onChange={handleNumber} /></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
}

export default PersonForm