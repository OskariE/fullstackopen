const Persons = ({people}) => {
    return people.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
        )
}
export default Persons