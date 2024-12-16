import PropTypes from 'prop-types'
const LoginForm = ({ user, username, password,
  setUsername, setPassword, handleLogin }) => {
  if (user === null) {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              data-testid='username'
              type='text'
              value={username}
              name='username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              data-testid='password'
              type='text'
              value={password}
              name='password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit' data-testid='login'>Login</button>
        </form>
      </div>
    )
  }
}
LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
