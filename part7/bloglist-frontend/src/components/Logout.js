import { Button } from 'react-bootstrap'

const Logout = ({ handleUserChange }) => {
  const padding = {
    marginRight: 8,
  }

  return (
    <Button
      style={padding}
      onClick={() => {
        window.localStorage.removeItem('loggedBlogappUser')
        handleUserChange()
      }}
    >
      Log out
    </Button>
  )
}

export default Logout
