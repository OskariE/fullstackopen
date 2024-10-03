import { useState, useEffect } from 'react'
import Content from './components/Content'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      window.alert('wrong credentials')
    }
  }

  return (
    <div>
      <Content user={user} username={username} password={password}
        setUsername={setUsername} setPassword={setPassword} 
        handleLogin={handleLogin} blogs={blogs}/>
    </div>
  )
}

export default App