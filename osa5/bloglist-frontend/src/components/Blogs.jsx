import Blog from './Blog'
import PropTypes from 'prop-types'

const Blogs = ({ blogs, user, addLike, handleRemove }) => {

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

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  addLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
}
export default Blogs