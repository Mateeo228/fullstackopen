import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './Users'
import User from './User'
import Blog from './Blog'
import { useUserDispatch, useUserValue } from '../UserContext'
import Logout from './Logout'
import Togglable from './Togglable'
import BlogsForm from './BlogsForm'
import { Navbar, Nav } from 'react-bootstrap'

const Menu = ({ blogs, users, addBlog, blogFormRef }) => {
  const blogsSort = blogs.sort((a, b) => b.likes - a.likes)

  const user = useUserValue()
  const dispatchUser = useUserDispatch()

  const padding = {
    paddingLeft: 15,
  }
  const marginTitle = {
    marginTop: 20,
    marginBottom: 15,
  }
  return (
    <Router>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Navbar.Brand href="/" style={padding}>
            Blog Application
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Blogs</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
          </Nav>
          <Nav className="mr-auto">
            <Nav.Link as="span">{user.name} logged in</Nav.Link>
            <Logout handleUserChange={() => dispatchUser({ type: 'CLEAR' })} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <h2 style={marginTitle}>Blogs</h2>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogsForm createBlog={addBlog} />
      </Togglable>
      <br></br>

      <Routes>
        <Route
          path="/"
          element={blogsSort.map((blog) => (
            <div key={blog.id} className="list-group">
              <Link to={`/blogs/${blog.id}`} className="list-group-item ">
                {blog.title}
              </Link>
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
