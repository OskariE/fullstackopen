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

const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => <Course key={course.id} course={course}/>)}
    </div>
  )
}

export default App