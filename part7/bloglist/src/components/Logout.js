const Logout = ({ handleUserChange }) => {
  return (
    <button
      onClick={() => {
        window.localStorage.removeItem('loggedBlogappUser')
        handleUserChange()
      }}
    >
      logout
    </button>
  )
}

export default Logout
