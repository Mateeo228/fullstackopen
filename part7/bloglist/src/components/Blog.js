import { useState } from 'react'
//import blogService from '../services/blogs'

const Blog = ({ blog, handleLike, handleRemoveBlog, user }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const blogOwner = user.username === blog.user.username ? true : false

  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenVisible} className="hideInfo">
        {blog.title} {blog.author}
        <button id="showButton" onClick={() => setBlogVisible(true)}>
          view
        </button>
      </div>
      <div style={showWhenVisible} className="showInfo">
        {blog.title} {blog.author}
        <button onClick={() => setBlogVisible(false)}>hide</button> <br />
        {blog.url} <br />
        likes {blog.likes}{' '}
        <button id="likeButton" onClick={() => handleLike(blog)}>
          like
        </button>{' '}
        <br />
        {blog.user.name} <br />
        {blogOwner && (
          <button id="removeButton" onClick={() => handleRemoveBlog(blog)}>
            remove
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog
