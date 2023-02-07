const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  const user = {
    username: 'testing',
    name: 'George',
    password: '12345',
  }

  await api
    .post('/api/users')
    .send(user)
    .set('Accept', 'application/json')
    .expect('Content-Type', /application\/json/)

  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('addition of a new blog', () => {

  test('a valid blog can be added', async () => {

    const login = {
      username: 'testing',
      password: '12345',
    }
  
    const logged = await api
      .post('/api/login')
      .send(login)
      .expect('Content-Type', /application\/json/)

    const newBlog = {
      title: "Adventure",
      author: "John",
      url: "hello.com",
      likes: 7
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${logged.body.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      'Adventure'
    )
  })

  test('blog with no likes has 0 likes', async () => {
    const login = {
      username: 'testing',
      password: '12345',
    }
  
    const logged = await api
      .post('/api/login')
      .send(login)
      .expect('Content-Type', /application\/json/)

    const newBlog = {
      title: "Adventure",
      author: "John",
      url: "hello.com"
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${logged.body.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)

  })

  test('blog with no tittle or url is not added', async () => {
    const login = {
      username: 'testing',
      password: '12345',
    }
  
    const logged = await api
      .post('/api/login')
      .send(login)
      .expect('Content-Type', /application\/json/)

    const newBlog = {
      author: "John",
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${logged.body.token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  })

  test('a blog fails with the proper status code 401 Unauthorized if a token is not provided', async () => {
    const newBlog = {
      title: "Adventure",
      author: "John",
      url: "hello.com",
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  })
})

describe('deletion of a blog', () => {
  let token = null

  beforeEach(async () => {
    await Blog.deleteMany({})

    const login = {
      username: 'testing',
      password: '12345',
    }
  
    const logged = await api
      .post('/api/login')
      .send(login)
      .expect('Content-Type', /application\/json/)

    const newBlog = {
      title: 'Example',
      author: 'Testing',
      url: 'https://example.com',
      likes: 2
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${logged.body.token}`)

    token = logged.body.token

    return token
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(0)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('blog update', () => {
  test('a valid blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    expect(blogsAtEnd[0].likes).toBe(blogToUpdate.likes + 1)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})