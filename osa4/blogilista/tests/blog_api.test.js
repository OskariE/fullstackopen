const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const supertest = require("supertest");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");
const app = require("../app");

const api = supertest(app);

const rootUser = {
    username: "root",
    password: "salainen",
  };

describe("with 3 blogs and root user initially saved", () => {
  const initialBlogs = [
    listHelper.blogs[0],
    listHelper.blogs[1],
    listHelper.blogs[2],
  ];
  beforeEach(async () => {
    await User.deleteMany({});
    const root = new User(rootUser);
    await root.save();
    await Blog.deleteMany({});
    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[2]);
    await blogObject.save();
  });

  describe("viewing blogs", () => {
    test("returns right amount of blogs", async () => {
      const response = await api.get("/api/blogs");
      assert.strictEqual(response.body.length, initialBlogs.length);
    });

    test("returned blogs are json", async () => {
      await api.get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });
  });

  describe("check blog correct keys/values", () => {
    test("blogs _id is converted to id", async () => {
      const response = await api.get("/api/blogs");
      assert.strictEqual(response.body[0].id, initialBlogs[0]._id);
    });

    test("likes defaults to 0", async () => {
      const newBlog = {
        user: "66ec42cdab76a5d7122b715f",
        title: "likes are 0",
        author: "fff",
        url: "hhhhh",
      };

      await api.post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const response = await api.get("/api/blogs");
      const contents = response.body.map((r) => r.likes);

      assert.strictEqual(response.body.length, initialBlogs.length + 1);
      assert.strictEqual(contents[contents.length - 1], 0);
    });
  });

  describe("adding blogs", () => {
    test("a valid blog can be added", async () => {
      const newBlog = {
        user: "66ec42cdab76a5d7122b715f",
        title: "testing",
        author: "aaaaaa",
        url: "d5454545",
        likes: "6",
      };

      await api.post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const response = await api.get("/api/blogs");
      const contents = response.body.map((r) => r.title);

      assert.strictEqual(response.body.length, initialBlogs.length + 1);
      assert(contents.includes("testing"), true);
    });

    test("blog without url or title wont be added", async () => {
      const noTitle = {
        user: "66ec42cdab76a5d7122b715f",
        author: "fff",
        url: "hhhhh",
      };
      const noUrl = {
        user: "66ec42cdab76a5d7122b715f",
        title: "likes are 0",
        author: "fff",
      };

      await api.post("/api/blogs")
        .send(noTitle)
        .expect(400);

      await api.post("/api/blogs")
        .send(noUrl)
        .expect(400);
    });
  });

  describe("removing or updating blogs", () => {
    test("blog can be removed", async () => {
      await api.delete(`/api/blogs/${initialBlogs[0]._id}`).expect(204);

      const blogsAfter = await api.get("/api/blogs");
      assert.strictEqual(blogsAfter.body.length, 2);
    });

    test("blog can be updated", async () => {
      const updatedBlog = {
        user: "66ec42cdab76a5d7122b715f",
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 400,
      };

      const r = await api.put("/api/blogs/5a422a851b54a676234d17f7")
        .send(updatedBlog)
        .expect(200);

      const response = await api.get("/api/blogs");
      const likes = response.body.map((r) => r.likes);
      assert(likes.includes(400), true);
    });
  });
});
after(async () => {
    await mongoose.connection.close();
  });