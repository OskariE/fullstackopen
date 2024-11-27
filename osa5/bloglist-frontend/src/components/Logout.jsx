const Logout = ({ user, handleLogout }) => {
  if (user) {
    return (
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>log out</button>
      </div>
    )
  }
}

export default Logout