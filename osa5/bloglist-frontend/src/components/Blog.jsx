import { useState } from 'react'
const Blog = ({ blog, addLike, handleRemove, user }) => {
  const [view, setView] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [deleteVisible, setDeleteVisible] = useState(false)

  const show = { display: deleteVisible ? '' : 'none' }

  const toggleVisibility = () => {
    if(user.username === blog.user.username) {
      setDeleteVisible(true)
    } else {
      setDeleteVisible(false)
    }
  }

  const blogStyle = {
    paddingTop: 5,
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 7,
  }

  const toggleView = () => {
    setView(!view)
  }

  const syncLikes = () => {
    setLikes(likes+1)
    blog.likes += 1
  }

  if (view) {
    return (
      <div style={blogStyle} className='blog'>
        <div>{blog.title} <button onClick={toggleView}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {likes} <button onClick={() => {addLike(blog), syncLikes()}}>like</button></div>
        <div>{blog.author}</div>
        <button style={show} onClick={() => handleRemove(blog)}>delete</button>
      </div>
    )
  }
  return (
    <div style={blogStyle} className='blog'>
      {blog.title} <button onClick={() => {toggleView(), toggleVisibility()}}>view</button>
    </div>
  )
}

export default Blog