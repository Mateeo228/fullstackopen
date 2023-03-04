const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('most blogs', () =>{
  test('when list has only one blog, returns that blog', () => {
    const result = listHelper.mostBlogs(helper.listWithOneBlog)
    expect(result).toStrictEqual({ author: 'Edsger W. Dijkstra', totalBlogs: 1 })
  })

  test('when list has multiple blogs, returns the author with more blogs', () => {
    const result = listHelper.mostBlogs(helper.initialBlogs)
    expect(result).toStrictEqual({ author: 'Robert C. Martin', totalBlogs: 3 })
  })

  test('when list is empty, returns a message', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toStrictEqual('no blogs has been posted')
  })
})


