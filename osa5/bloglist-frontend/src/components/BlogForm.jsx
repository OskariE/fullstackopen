import { useState } from 'react'

const BlogForm = ({ user, handleCreation }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const addBlog = (event) => {
    event.preventDefault()
    handleCreation({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  if (user !== null) {
    return (
      <div className='blogForm'>
        <h2>Create new</h2>
        <form onSubmit={addBlog}>
          <div className='blogFormChild'>
            title
            <input
              type='text'
              value={newTitle}
              name='title'
              onChange={({ target }) => setNewTitle(target.value)}
              id='title-input'/>
          </div>
          <div className='blogFormChild'>
            author
            <input
              type='text'
              value={newAuthor}
              name='author'
              onChange={({ target }) => setNewAuthor(target.value)}
              id='author-input'/>
          </div>
          <div className='blogFormChild'>
            url
            <input
              type='text'
              value={newUrl}
              name='url'
              onChange={({ target }) => setNewUrl(target.value)}
              id='url-input'/>
          </div>
          <button type='submit' className='blogFormChild' id='create-submit'>create</button>
        </form>
      </div>
    )
  }
}

export default BlogForm