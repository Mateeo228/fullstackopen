import { useState } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { useParams, useNavigate } from 'react-router'
import { update, remove } from '../services/blogs'
import { useUserValue } from '../UserContext'
import { createComment } from '../services/blogs'
import { Form, Button } from 'react-bootstrap'

const Blog = ({ blogs }) => {
  const queryClient = useQueryClient()
  const [comment, setComment] = useState('')

  const navigate = useNavigate()

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

  const commentMutation = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const user = useUserValue()
  const blogId = useParams().id
  const blog = blogs.find((blog) => blogId === blog.id)
  const blogOwner = user.username === blog.user.username ? true : false

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
      navigate('/')
    }
  }

  const addComment = (event) => {
    event.preventDefault()
    const newComment = { comment: comment }
    commentMutation.mutate({ newComment: newComment, id: blog.id })
    setComment('')
  }

  const margin = {
    marginLeft: 10,
  }

  const marginTitle = {
    marginTop: 20,
    marginBottom: 15,
  }

  return (
    <>
      <h2 style={marginTitle}>{blog.title}</h2>
      <div className="list-group">
        <a href={blog.url} className="list-group-item">
          {blog.url}
        </a>
        <div className="list-group-item">
          {blog.likes} likes
          <Button
            id="likeButton"
            style={margin}
            onClick={() => handleLike(blog)}
          >
            Like
          </Button>
        </div>
        <div className="list-group-item">Added by {blog.user.name}</div>
      </div>
      <br></br>
      {blogOwner && (
        <Button id="removeButton" onClick={() => handleRemoveBlog(blog)}>
          Remove
        </Button>
      )}
      <h2 style={marginTitle}>Comments</h2>
      <Form onSubmit={addComment}>
        <Form.Control
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <Button type="submit">Add comment</Button>
      </Form>
      <br></br>
      <ul className="list-group">
        {blog.comments.map((blogComment, i) => (
          <li key={i} className="list-group-item">
            {blogComment}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Blog
