const { test, after, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')


const emptyList = []
const blogs = listHelper.blogs

test('dummy returns one', () => {
  const result = listHelper.dummy(emptyList)
  assert.strictEqual(result, 1)
})

describe('sum of likes', () => {
  test('empty list returns zero', () => {
    const result = listHelper.totalLikes(emptyList)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listHelper.listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })
})

describe('returning specific author or blog', () => {
  test('returns blog with highest likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.strictEqual(result, blogs[2]._id)
  })

  test('returns author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
  })

  test('returns author with most total likes', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })
  })
})
after(async () => {
  await mongoose.connection.close()
})
