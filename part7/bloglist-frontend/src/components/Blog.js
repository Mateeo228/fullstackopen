import { useState } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { useParams, useNavigate } from 'react-router'
import { update, remove } from '../services/blogs'
import { useUserValue } from '../UserContext'
import { createComment } from '../services/blogs'

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

  return (
    <>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button id="likeButton" onClick={() => handleLike(blog)}>
          like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      {blogOwner && (
        <button id="removeButton" onClick={() => handleRemoveBlog(blog)}>
          remove
        </button>
      )}
      <h2>Comments</h2>
      <form onSubmit={addComment}>
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button type="submit">Add comment</button>
      </form>
      <ul>
        {blog.comments.map((blogComment, i) => (
          <li key={i}> {blogComment} </li>
        ))}
      </ul>
    </>
  )
}

export default Blog
