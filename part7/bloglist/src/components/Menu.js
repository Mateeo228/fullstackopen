import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './Users'
import User from './User'
import Blog from './Blog'
import { useUserDispatch, useUserValue } from '../UserContext'
import Logout from './Logout'
import Togglable from './Togglable'
import BlogsForm from './BlogsForm'

const Menu = ({ blogs, users, addBlog, blogFormRef }) => {
  const blogsSort = blogs.sort((a, b) => b.likes - a.likes)

  const user = useUserValue()
  const dispatchUser = useUserDispatch()

  const padding = {
    paddingRight: 5,
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        <em>{user.name} logged in</em>
        <Logout handleUserChange={() => dispatchUser({ type: 'CLEAR' })} />
      </div>

      <h2>blogs</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogsForm createBlog={addBlog} />
      </Togglable>

      <Routes>
        <Route
          path="/"
          element={blogsSort.map((blog) => (
            <div key={blog.id} style={blogStyle}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
          ))}
        />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User users={users} />} />
        <Route path="/blogs/:id" element={<Blog blogs={blogs} />} />
      </Routes>
    </Router>
  )
}

export default Menu
