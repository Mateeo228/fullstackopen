import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog , setBlogs, user }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogOwner = user.username === blog.user.username
    ? true
    : false

  const handleLike = async () => {
    const blogs = await blogService.getAll()
    const findedBlog = blogs.find(b => b.id === blog.id)
    const blogId = findedBlog.id

    const likeUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }

    await blogService.update(likeUpdate,blogId)
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
  }

  const handleRemoveBlog = async () => {
    const blogs = await blogService.getAll()
    const findedBlog = blogs.find(b => b.id === blog.id)
    const blogId = findedBlog.id

    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      await blogService.remove(blogId)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
    }
  }

  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setBlogVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setBlogVisible(false)}>hide</button> <br/>
        {blog.url} <br/>
        likes {blog.likes} <button onClick={handleLike}>like</button> <br/>
        {blog.user.name} <br/>
        {blogOwner && <button onClick={handleRemoveBlog}>remove</button>}
      </div>
    </div>
  )
}

export default Blog