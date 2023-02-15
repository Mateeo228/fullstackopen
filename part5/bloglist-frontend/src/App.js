import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogsForm from './components/BlogsForm'
import Logout from './components/Logout'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const blogFormRef = useRef()

  const blogsSort = blogs.sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
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
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('logged')
      setError(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setError(true)
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    try{
      blogFormRef.current.toggleVisibility()
      const response = await blogService.create(blogObject)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)

      setMessage(`a new blog ${response.title} by ${response.author}`)
      setError(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (exception){
      setError(true)
      setMessage('Failed to add a new blog')
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleUserChange = () => {
    setUser(null)
  }

  return (
    <div>
      <Notification message={message} error={error} />
      {user === null
        ? <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
        />
        : <div>
          <h2>blogs</h2>
          <div>{user.name} logged in
            <Logout handleUserChange={handleUserChange}/>
          </div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogsForm createBlog={addBlog} />
          </Togglable>
          {blogsSort.map(blog =>
            <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} />
          )}
        </div>
      }
    </div>
  )
}

export default App