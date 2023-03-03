import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService, { getAll, create, update, remove } from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogsForm from './components/BlogsForm'
import Logout from './components/Logout'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNotificationDispatch } from './NotificationContext'
import { useUserDispatch, useUserValue } from './UserContext'

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

  const likeMutation = useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const removeMutation = useMutation(remove, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const blogFormRef = useRef()

  const result = useQuery('blogs', getAll)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatchUser({ type: 'USER', payload: user })
      //setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  const blogsSort = blogs.sort((a, b) => b.likes - a.likes)

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
      //setUser(user)
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

  const handleLike = async (blog) => {
    const likeUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user,
    }

    likeMutation.mutate({ blogUpdated: likeUpdate, id: blog.id })
  }

  const handleRemoveBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeMutation.mutate(blog.id)
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
          <h2>blogs</h2>
          <div>
            {user.name} logged in
            <Logout handleUserChange={() => dispatchUser({ type: 'CLEAR' })} />
          </div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogsForm createBlog={addBlog} />
          </Togglable>
          {blogsSort.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleRemoveBlog={handleRemoveBlog}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
