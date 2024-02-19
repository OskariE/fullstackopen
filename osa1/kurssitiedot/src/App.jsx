const Header = (props) => {
  return (
    <div>
      <h1>{props.coursename}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.partname} {props.exercises}</p>
    </div>
  )
}

const Content = () => {
  return (
    <div>
      <Part partname= "Fundamentals of React" exercises={10}/>
      <Part partname= "Using props to pass data" exercises= {7}/>
      <Part partname= "State of a component" exercises= {14}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  )
}


const App = () => {

  return (
    <div>
      <Header coursename= "Half Stack application development"/>
      <Content/>
      <Total total= {31}/>
    </div>
  )
}

export default App