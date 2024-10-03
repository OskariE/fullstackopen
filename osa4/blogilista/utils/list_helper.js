const lodash = require("lodash");
const Blog = require("../models/blog");
const User = require("../models/user");

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (highest, blog) => {
    if (highest < blog.likes) {
      highest = blog.likes;
    }
    return highest;
  };
  const most = blogs.reduce(reducer, 0);
  return blogs.filter((blog) => blog.likes === most)[0]._id;
};

const mostBlogs = (blogs) => {
  const amounts = lodash.countBy(blogs.map((blog) => blog.author));
  const mostAuthor = lodash.max(
    Object.keys(amounts, (author) => amounts[author])
  );
  const max = lodash.max(Object.values(amounts));
  return { author: mostAuthor, blogs: max };
};

const mostLikes = (blogs) => {
  list = {};
  const reducer = (list, blog) => {
    author = blog.author;
    if (Object.keys(list).includes(author)) {
      const likes = list[author];
      newLikes = likes + blog.likes;
      list[author] = newLikes;
    } else {
      list[author] = blog.likes;
    }
    return list;
  };
  const total = blogs.reduce(reducer, list);
  const max = lodash.max(Object.values(total));
  const maxAuthor = Object.keys(total).find((key) => total[key] === max);
  return { author: maxAuthor, likes: max };
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  blogsInDb,
  usersInDb,
  listWithOneBlog,
  blogs,
};
