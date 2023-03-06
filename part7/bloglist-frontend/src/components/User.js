import { useParams } from 'react-router'

const User = (users) => {
  const userId = useParams().id
  const user = users.users.find((user) => userId === user.id)
  return (
    <>
      <h2>{user.name}</h2>
      <br></br>
      <h3>Added blogs</h3>
      <br></br>
      <ul className="list-group">
        {user.blogs.map((blog, i) => (
          <li key={i} className="list-group-item">
            {blog.title}
          </li>
        ))}
      </ul>
    </>
  )
}

export default User
