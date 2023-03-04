import { useParams } from 'react-router'

const User = (users) => {
  const userId = useParams().id
  const user = users.users.find((user) => userId === user.id)
  return (
    <>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog, i) => (
          <li key={i}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
