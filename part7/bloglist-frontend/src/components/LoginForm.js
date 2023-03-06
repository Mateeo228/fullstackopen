import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            id="username"
            type="text"
            name="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            name="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button id="login-button" type="submit">
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
