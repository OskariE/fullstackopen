import Blog from './Blog'

const Blogs = ({blogs, title, author, url, setTitle, setAuthor, setUrl, handleCreation, user}) => {
  if (user !== null) {
    return (
      <div>
        <h2>Blogs</h2>
        <h2>Create new</h2>
        <form onSubmit={handleCreation}>
          <div>
            title
            <input
              type='text'
              value={title}
              name='title'
              onChange={({ target }) => setTitle(target.value)}/> 
          </div>
          <div>
            author
            <input
              type='text'
              value={author}
              name='author'
              onChange={({ target }) => setAuthor(target.value)}/>
          </div>
          <div>
            url
            <input
              type='text'
              value={url}
              name='url'
              onChange={({ target }) => setUrl(target.value)}/>
          </div>
          <button type='submit'>create</button>
        </form>
        {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
      </div>
    )
  }
  return null
}

export default Blogs