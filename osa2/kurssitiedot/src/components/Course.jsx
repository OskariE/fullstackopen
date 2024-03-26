const Header = (props) => {
    return (
      <h1>{props.course.name}</h1>
    )
  }
  
  const Content = (props) => {
    return (
        <ul>
          {props.course.parts.map(part => <li key={part.id}>{part.name}, {part.exercises}</li>)}
        </ul>
    )
  }
  
  const Total = (props) => {
    const exercises = props.course.parts.map(part => part.exercises)
    const sum = exercises.reduce((a, b) => a+b, 0)
    return (
      <ul>
        <li>
          Number of exercises {sum}
        </li>
      </ul>
    )
  }
  
  const Course = (props) => {
    return (
      <>
      <Header course={props.course}/>
      <Content course={props.course}/>
      <Total course={props.course}/>
      </>
    )
  }
export default Course