const express = require('express');
const Blog = require('../models/blog');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render('index', { title: 'Home', blogs });
  } catch (error) {
    console.error(error);
  }
});

// This needs to go before /blogs/:id otherwise it won't load.
router.get('/create', (req, res) => {
  res.render('new-blog', { title: 'New Blog' });
});

// This needs to go before /blogs/:id otherwise it won't load.
router.get('/posted', (req, res) => {
  res.render('blog-posted', { title: 'Blog Posted' });
});

// This needs to go before /blogs/:id otherwise it won't load.
router.get('/deleted', (req, res) => {
  res.render('blog-deleted', { title: 'Blog Deleted' });
});

router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.render('blog', { title: blog.title, blog });
  } catch (error) {
    console.error(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ redirect: '/blogs/deleted' });
  } catch (error) {
    console.error(error);
  }
});

router.post('/', async (req, res) => {
  try {
    await Blog.create(new Blog(req.body));
    res.redirect('/blogs/posted');
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
