const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salasana', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'anon',
      name: 'nimi',
      password: 'salsa',
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await listHelper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    const usernames = usersAtEnd.map((u) => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation returns proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'root',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await listHelper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

describe('creating and removing users on empty database', async () => {
  await User.deleteMany({})
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'anon',
      name: 'nimi',
      password: 'salsa',
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await listHelper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    const usernames = usersAtEnd.map((u) => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation returns proper statuscode and message if username is too short', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'as',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await listHelper.usersInDb()
    assert(
      result.body.error.includes(
        'is shorter than the minimum allowed length (3)',
      ),
    )

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation returns proper statuscode and message if password is too short', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'asdasdasd',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await listHelper.usersInDb()
    assert(result.body.error.includes('password too short'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation returns proper statuscode and message without password', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'asdd',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await listHelper.usersInDb()
    assert(result.body.error.includes('password missing'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})
after(async () => {
  await mongoose.connection.close()
})