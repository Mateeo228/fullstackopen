import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

// eslint-disable-next-line quotes
test("renders blog's title and author, but does not render its URL or likes by default", () => {
  const blog = {
    title: 'test',
    author: 'Tester',
    url: 'www.testing.com',
    likes: 6,
    user: {
      username: 'MJS',
    },
  }

  const user = {
    username: 'MJS',
  }

  const component = render(<Blog blog={blog} user={user} />)

  const selectedBlog = component.container.querySelector('.blog')
  expect(selectedBlog).toHaveTextContent('test')
  expect(selectedBlog).toHaveTextContent('Tester')

  const blogInfo = component.container.querySelector('.hideInfo')
  expect(blogInfo).not.toHaveTextContent('www.testing.com')
  expect(blogInfo).not.toHaveTextContent('likes')
})

test('clicking the button shows blog info', () => {
  const blog = {
    title: 'test',
    author: 'Tester',
    url: 'www.testing.com',
    likes: 6,
    user: {
      username: 'MJS',
    },
  }

  const user = {
    username: 'MJS',
  }

  const component = render(<Blog blog={blog} user={user} />)
  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.blog')
  expect(div).not.toHaveStyle('display: none')
  expect(div).toHaveTextContent('www.testing.com')
  expect(div).toHaveTextContent('6')
})

test('clicking the like button twice, the event handler is called twice', () => {
  const blog = {
    title: 'test',
    author: 'Tester',
    url: 'www.testing.com',
    likes: 6,
    user: {
      username: 'MJS',
    },
  }

  const user = {
    username: 'MJS',
  }

  let mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} handleLike={mockHandler} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const like = component.getByText('like')
  fireEvent.click(like)
  fireEvent.click(like)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
