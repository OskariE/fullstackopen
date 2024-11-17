import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import Logout from './components/Logout'
import Error from './components/Error'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const blogFormRef = useRef()

  

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
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCreation = async (blogObject) => {
    const newObject = {
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url,
    }
    try {
      await blogService.create(newObject)
      blogFormRef.current.toggleVisibility()
      setNotificationMessage(`A new blog "${blogObject.title}" by "${blogObject.author}" added`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const handleRemove = async (blog) => {
    try {
      if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.remove(blog.id)
        setNotificationMessage(`Blog removed`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
    }
    } catch(exception) {
      setErrorMessage(exception.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addLike = async (blogObject) => {
    const newObject = {
      user: blogObject.user,
      id: blogObject.id,
      likes: blogObject.likes + 1,
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url,
    }
    try {
      await blogService.addLike(newObject)
    } catch(exception) {
      setErrorMessage(exception.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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
      <Notification notificationMessage={notificationMessage}/>
      <Error errorMessage={errorMessage}/>
      <LoginForm user={user} username={username} password={password}
        setUsername={setUsername} setPassword={setPassword}
        handleLogin={handleLogin}/>
      <Toggleable user={user} buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm user={user} handleCreation={handleCreation}/>
      </Toggleable>
      <Blogs blogs={blogs} user={user} addLike={addLike} handleRemove={handleRemove}/>
    </div>
  )
}

export default App