import Blog from './Blog'
const Content = ({user, username, password, setUsername, setPassword, handleLogin, handleLogout, blogs}) => {
  if (user) {
    return (
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>log out</button>
        <h2>blogs</h2>
        {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
      </div>
    )
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='text'
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
export default Content
