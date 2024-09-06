const { test, after, describe, beforeEach } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

const emptyList = [];

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

test('dummy returns one', () => {
  const result = listHelper.dummy(emptyList);
  assert.strictEqual(result, 1);
});

describe('sum of likes', () => {
  test('empty list returns zero', () => {
    const result = listHelper.totalLikes(emptyList)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test('bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 36);
  });
});

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

describe('with 3 blogs initially saved', () => {
  const initialBlogs = [blogs[0], blogs[1], blogs[2]]
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
  })

  describe('viewing blogs', () => {
    test('returns right amount of blogs', async () => {
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, initialBlogs.length)
    })

    test('returned blogs are json', async () => {
      await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  })

  describe('check blog correct keys/values', () => {
    test('blogs _id is converted to id', async () => {
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body[0].id, initialBlogs[0]._id)
    })

    test('likes defaults to 0', async () => {
      const newBlog = {
        title: 'likes are 0',
        author: 'fff',
        url: 'hhhhh',
        }
    
      await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      const response = await api.get('/api/blogs')
      const contents = response.body.map(r => r.likes)
    
      assert.strictEqual(response.body.length, initialBlogs.length+1)
      assert.strictEqual(contents[contents.length-1], 0)
    })
  })

  describe('adding blogs', () => {
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'testing',
        author: 'aaaaaa',
        url: 'd5454545',
        likes: '6'
        }
  
      await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      const response = await api.get('/api/blogs')
      const contents = response.body.map(r => r.title)
  
      assert.strictEqual(response.body.length, initialBlogs.length+1)
      assert(contents.includes('testing'), true)
    })
  
    test('blog without url or title wont be added', async () => {
      const noTitle = {
        author: 'fff',
        url: 'hhhhh'
        }
      const noUrl = {
        title: 'likes are 0',
        author: 'fff'
        }
      
      await api.post('/api/blogs')
        .send(noTitle)
        .expect(400)
  
      await api.post('/api/blogs')
        .send(noUrl)
        .expect(400)
    })  
  })

  describe('removing or updating blogs', () => {

    test('blog can be removed', async () => {
      await api.delete(`/api/blogs/${initialBlogs[0]._id}`).expect(204)
  
      const blogsAfter = await api.get('/api/blogs')
      assert.strictEqual(blogsAfter.body.length, 2)
    })
  
    test('blog can be updated', async () => {
      const updatedBlog = {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 400,
      }
  
      const r = await api.put('/api/blogs/5a422a851b54a676234d17f7')
        .send(updatedBlog)
        .expect(200)
  
      const response = await api.get('/api/blogs')
      const likes = response.body.map(r => r.likes)
      assert(likes.includes(400), true)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})