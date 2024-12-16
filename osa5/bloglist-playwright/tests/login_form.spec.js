const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'root',
          username: 'root',
          password: 'salasana'
        }
      })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const username = await page.getByTestId('username')
    const password = await page.getByTestId('password')
    const login = await page.getByTestId('login')
    
    await expect(username, password, login).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await page.getByTestId('username').fill('root')
        await page.getByTestId('password').fill('salasana')
        await page.getByRole('button', { name: 'Login' }).click() 

        await expect(page.getByText('root logged in')).toBeVisible()
    })

    test('fails with incorrect credentials', async ({ page }) => {
        await page.getByTestId('username').fill('incorrect')
        await page.getByTestId('password').fill('asdasd')
        await page.getByRole('button', { name: 'Login' }).click() 

        await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('root')
      await page.getByTestId('password').fill('salasana')
      await page.getByRole('button', { name: 'Login' }).click() 

      await expect(page.getByText('root logged in')).toBeVisible()
    })
  
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByTestId('title').fill('SOMETHING')
      await page.getByTestId('author').fill('SOMEONE')
      await page.getByTestId('url').fill('TEST')

      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('A new blog "SOMETHING" by "SOMEONE" added')).toBeVisible()
      await expect(page.getByText('view')).toBeVisible()
    })
    describe('with a blog created', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByTestId('title').fill('TESTING')
        await page.getByTestId('author').fill('BLOGS')
        await page.getByTestId('url').fill('asd')
        await page.getByRole('button', { name: 'create' }).click()
      })

      test('blog can be liked', async ({ page }) => {
        await expect(page.getByText('TESTING view')).toBeVisible()
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('likes 0')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 2')).toBeVisible()
      })

      test('blog can be removed', async ({ page }) => {
        await expect(page.getByText('TESTING view')).toBeVisible()
        await page.getByRole('button', { name: 'view' }).click()
        page.on('dialog', dialog => dialog.accept());
        await page.getByRole('button', { name: 'delete' }).click()
        
        await expect(page.getByText('TESTING hide')).not.toBeVisible()
        await expect(page.getByText('TESTING view')).not.toBeVisible()
      })

      test('only creator can see delete  button', async ({ page, request }) => {
        await expect(page.getByText('TESTING view')).toBeVisible()
        await page.getByRole('button', { name: 'view' }).click()

        await expect(page.getByRole('button', { name: 'delete' })).toBeVisible()

        await request.post('http://localhost:3003/api/users', {
          data: {
            name: 'testuser',
            username: 'testuser',
            password: 'salasana'
          }
        })
        
        await page.getByRole('button', { name: 'log out' }).click()

        await page.getByTestId('username').fill('testuser')
        await page.getByTestId('password').fill('salasana')
        await page.getByRole('button', { name: 'Login' }).click() 
        await expect(page.getByText('testuser logged in')).toBeVisible()

        await expect(page.getByText('TESTING view')).toBeVisible()
        await page.getByRole('button', { name: 'view' }).click()

        await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
      })
    })

    describe('with 3 blogs created', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByTestId('title').fill('first')
        await page.getByTestId('author').fill('BLOGS')
        await page.getByTestId('url').fill('asd')
        await page.getByRole('button', { name: 'create' }).click()

        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByTestId('title').fill('second')
        await page.getByTestId('author').fill('BLOGS')
        await page.getByTestId('url').fill('sdf')
        await page.getByRole('button', { name: 'create' }).click()

        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByTestId('title').fill('third')
        await page.getByTestId('author').fill('author')
        await page.getByTestId('url').fill('dfg')
        await page.getByRole('button', { name: 'create' }).click()
        await expect(page.getByText('A new blog "third" by "author" added')).toBeVisible()
      })

      test('blogs are sorted by likes', async ({ page }) => {
        const viewButtons = await page.getByRole('button', { name: 'view' }).all()
        await viewButtons[0].click()
        await viewButtons[0].click()
        await viewButtons[0].click()

        const likeButtons = await page.getByRole('button', { name: 'like' }).all()
        await likeButtons[0].click()
        await likeButtons[0].click()

        await likeButtons[1].click()
        await likeButtons[1].click()
        await likeButtons[1].click()
        await likeButtons[1].click()
        await likeButtons[1].click()
        await likeButtons[1].click()
        
        await likeButtons[2].click()
        await likeButtons[2].click()
        await likeButtons[2].click()
        await likeButtons[2].click()

        await page.reload()
        await page.waitForTimeout(100)
        const viewButtons2 = await page.getByRole('button', { name: 'view' }).all()
        await viewButtons2[0].click()
        await expect(page.getByText('6', 'second')).toBeVisible()
        await viewButtons2[0].click()
        await expect(page.getByText('4', 'third')).toBeVisible()
        await viewButtons2[0].click()
        await expect(page.getByText('2', 'first')).toBeVisible()
      })
    })
  })
})
