import Blog from './Blog'

const Blogs = ({blogs, user, addLike, handleRemove}) => {

  const compare = ( a, b ) => {
    if (a.likes > b.likes) {
      return -1
    }
    if (a.likes < b.likes) {
      return 1
    }
  }
  blogs = blogs.sort(compare)

  if (user !== null) {
    return (
      <div>
        {blogs.map((blog) => <Blog key={blog.id} blog={blog} addLike={addLike} handleRemove={handleRemove} user={user} />)}
      </div>
    )
  }
  return null
}

export default Blogs