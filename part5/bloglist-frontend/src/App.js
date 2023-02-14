import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

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
      setMessage(`logged`)
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

  
  const addBlog = async (event) => {
    event.preventDefault()
    try{
      const newBlog = {
        title: title,
        author: author,
        url: url
      }
      const response = await blogService.create(newBlog)
      
      setBlogs(blogs.concat(response))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`a new blog ${response.title} by ${response.author}`)
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

  const loginForm = () => 
    <div>
      <h2>Log in to application</h2>
      <Notification message={message} error={error} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input 
            type="text"
            name="Username"
            value={username} 
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input 
            type="password"
            name="Password"
            value={password} 
            onChange={(event) => setPassword(event.target.value)} 
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  

  const blogsForm = () => {
    return(
      <div>
        <h2>blogs</h2>
        <Notification message={message} error={error} />
        <div>{user.name} logged in
          <button onClick={ () => {
            window.localStorage.removeItem('loggedBlogappUser')
            setUser(null)
          }}>logout</button>
        </div>
        <br></br>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title: <input type="text" value={title} name="Title" onChange={(event) => setTitle(event.target.value)} />  
          </div> 
          <div>
            author: <input type="text" value={author} name="Author" onChange={(event) => setAuthor(event.target.value)} />  
          </div> 
          <div>
            url: <input type="text" value={url} name="Url" onChange={(event) => setUrl(event.target.value)} />  
          </div> 
        <button type="submit">create</button>
        </form>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      {user === null 
        ? loginForm()
        : blogsForm()
      }
    </div>
  )
}

export default App