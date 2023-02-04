const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('most likes', () =>{
  test('when list has one blog, returns that one', () => {
    const result = listHelper.mostLikes(helper.listWithOneBlog)
    expect(result).toStrictEqual({ author: 'Edsger W. Dijkstra', likes: 5 })
  })

  test('when list has multiple blogs, returns the author with more blogs', () => {
    const result = listHelper.mostLikes(helper.initialBlogs)
    expect(result).toStrictEqual({ author: 'Edsger W. Dijkstra', likes: 12 })
  })

  test('when list has no blogs, returns a message', () => {
    const result = listHelper.mostLikes([])
    expect(result).toStrictEqual('no blogs has been posted')
  })
})