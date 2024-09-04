const lodash = require('lodash')
const Blog = require('../models/blog')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (highest, blog) => {
        if (highest < blog.likes) {
            highest = blog.likes
        }
        return highest
    }
    const most = blogs.reduce(reducer, 0)
    return blogs.filter(blog => blog.likes === most)[0]._id
}

const mostBlogs = (blogs) => {
    const amounts = lodash.countBy(blogs.map(blog => blog.author))
    const mostAuthor = lodash.max(Object.keys(amounts, author => amounts[author]))
    const max = lodash.max(Object.values(amounts))
    return { author:mostAuthor, blogs:max }
}

const mostLikes = (blogs) => {
    list = {}
    const reducer = (list, blog) => {
        author = blog.author
        if (Object.keys(list).includes(author)) {
            const likes = list[author]
            newLikes = likes + blog.likes
            list[author] = newLikes
        } else{
            list[author] = blog.likes;
        }
        return list
    }
    const total = blogs.reduce(reducer, list)
    const max = lodash.max(Object.values(total))
    const maxAuthor = Object.keys(total).find(key => total[key] === max)
    return { author: maxAuthor, likes: max }
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes, blogsInDb
}