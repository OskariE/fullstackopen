import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Logout from './components/Logout'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setUrl] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      window.alert('wrong credentials')
    }
  }

  const handleCreation = async (event) => {
    event.preventDefault()
    const newObject = {
      title: title,
      author: author,
      url: url,
    }
    await blogService.create(newObject)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    setUsername('')
    setPassword('')
    blogService.setToken(null)
  }

  return (
    <div>
      <Logout user={user} handleLogout={handleLogout}/>
      <LoginForm user={user} username={username} password={password}
        setUsername={setUsername} setPassword={setPassword}
        handleLogin={handleLogin}/>
      <Blogs blogs={blogs} title={title} author={author} url={url} setTitle={setTitle}
        setAuthor={setAuthor} setUrl={setUrl} handleCreation={handleCreation} user={user}/>
    </div>
  )
}

export default App