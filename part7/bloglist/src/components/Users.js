import { Link } from 'react-router-dom'

const Users = (users) => {
  if (!users) {
    return null
  } else {
    return (
      <>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.users.map((user, i) => (
              <tr key={i}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }
}

export default Users
