const Logout = ({ user, handleLogout }) => {
  if (user) {
    return (
      <div className='logout'>
        {user.name} logged in
        <button onClick={handleLogout}>log out</button>
      </div>
    )
  }
}

export default Logout