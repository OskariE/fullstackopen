const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
        <ul>
          {props.course.parts.map(part => <li key={part.id}>{part.name}, {part.exercises}</li>)}
        </ul>
    </div>
  )
}

const Total = (props) => {
  const exercises = props.course.parts.map(part => part.exercises)
  const sum = exercises.reduce((a, b) => a+b, 0)
  return (
    <div>
      <ul>
        <li>
          Number of exercises {sum}
        </li>
      </ul>
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course}/>
      <Content course={props.course}/>
      <Total course={props.course}/>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App