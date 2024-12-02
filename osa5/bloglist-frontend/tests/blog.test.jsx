import { render, screen } from '@testing-library/react'
import Blog from '../src/components/Blog'
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

test('renders only blog title', () => {
  const { container } = render(<Blog blog={blog}/>)
  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent('TEST')
  expect(div).not.toHaveTextContent('SOMEONE')
  expect(div).not.toHaveTextContent('SOMETHING')
})

test('renders author, url and likes after pressing view', async () => {
  const user = userEvent.setup()

  const { container } = render(<Blog blog={blog} user={blogUser}/>)
  const div = container.querySelector('.blog')
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  expect(div).toHaveTextContent('TEST')
  expect(div).toHaveTextContent('SOMEONE')
  expect(div).toHaveTextContent('SOMETHING')
  expect(div).toHaveTextContent('0')
})

test('clicking like twice calls event handler twice', async () => {
  const user = userEvent.setup()
  const mockHandler = vi.fn()
  render(<Blog blog={blog} user={blogUser} addLike={mockHandler}/>)

  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})