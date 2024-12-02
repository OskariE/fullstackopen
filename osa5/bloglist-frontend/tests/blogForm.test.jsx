import { render } from '@testing-library/react'
import BlogForm from '../src/components/BlogForm'
import userEvent from '@testing-library/user-event'

const blogUser = {
  username: 'root',
  name: 'asd',
  id: '66ec42cdab76a5d7122b715f'
}
const blog = {
  title: 'TEST',
  author: 'SOMEONE',
  url: 'SOMETHING',
  likes: 0,
  user: {
    username: 'root',
    name: 'asd',
    id: '66ec42cdab76a5d7122b715f'
  },
}

test('Form calls function with correct info', async () => {
  const user = userEvent.setup()
  const mockHandler = vi.fn()
  const { container } = render(<BlogForm user={blogUser} handleCreation={mockHandler}/>)

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')
  const createButton = container.querySelector('#create-submit')

  await user.type(titleInput, blog.title)
  await user.type(authorInput, blog.author)
  await user.type(urlInput, blog.url)
  await user.click(createButton)

  expect(mockHandler.mock.calls).toStrictEqual([ [ {
    title: 'TEST', author: 'SOMEONE', url: 'SOMETHING' } ] ])

})
