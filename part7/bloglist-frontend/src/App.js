import { useState, useEffect, useRef } from 'react'
import blogService, { getAll, create } from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNotificationDispatch } from './NotificationContext'
import { useUserDispatch, useUserValue } from './UserContext'
import { getAllUsers } from './services/users'
import Menu from './components/Menu'

const App = () => {
  const queryClient = useQueryClient()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useUserValue()
  const dispatchUser = useUserDispatch()
  const dispatch = useNotificationDispatch()

  const newBlogMutation = useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const blogFormRef = useRef()

  const result = useQuery('blogs', getAll)
  const resultUsers = useQuery('users', getAllUsers)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatchUser({ type: 'USER', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (resultUsers.isLoading) {
    return <div>loading data...</div>
  }
  const blogs = result.data

  const users = resultUsers.data

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatchUser({ type: 'USER', payload: user })
      setUsername('')
      setPassword('')
      dispatch({ type: 'SET', error: false, payload: 'logged' })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
    } catch (exception) {
      dispatch({
        type: 'SET',
        error: true,
        payload: 'Wrong username or password',
      })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      newBlogMutation.mutate(blogObject)

      dispatch({
        type: 'SET',
        error: false,
        payload: `a new blog ${blogObject.title} by ${blogObject.author}`,
      })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
    } catch (exception) {
      dispatch({
        type: 'SET',
        error: true,
        payload: 'failed to add a new blog',
      })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
    }
  }

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={(event) => setUsername(event.target.value)}
          handlePasswordChange={(event) => setPassword(event.target.value)}
          username={username}
          password={password}
        />
      ) : (
        <div>
          <Menu
            blogs={blogs}
            users={users}
            addBlog={addBlog}
            blogFormRef={blogFormRef}
          />
        </div>
      )}
    </div>
  )
}

export default App
