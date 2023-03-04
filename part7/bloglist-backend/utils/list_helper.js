const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  const favorite = blogs.find(blog => blog.likes == maxLikes)
  if (favorite) return favorite
  else return 'No blogs to see'
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0){
    return 'no blogs has been posted'
  }

  const authorsBlogs = blogs.map( blog => 
    blogs.reduce( (acc, item) => {
      if(item.author === blog.author){
        acc.totalBlogs = acc.totalBlogs + 1
        return acc
      } else return acc
    }, {author: blog.author, totalBlogs: 0})
  ) 

  const maxAuthor = authorsBlogs.reduce( (acc, item) => {
    const max = Math.max(acc.totalBlogs, item.totalBlogs)
    if(max === acc.totalBlogs){
      return acc
    } else return item
  })

  return maxAuthor
}

const mostLikes = (blogs) => {
  if(blogs.length === 0){
    return 'no blogs has been posted'
  }

  const authorsBlogs = blogs.map( blog => {return {author: blog.author, likes: blog.likes}}) 

  const maxLikes = authorsBlogs.reduce( (acc, item) => {
    const max = Math.max(acc.likes, item.likes)
    if(max === acc.likes){
      return acc
    } else return item
  })

  return maxLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}