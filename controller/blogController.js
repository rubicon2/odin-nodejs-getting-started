const Blog = require('../models/blog');

async function blog_index(req, res) {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render('blogs/index', { title: 'Home', blogs });
  } catch (error) {
    console.error(error);
  }
}

async function blog_details(req, res) {
  try {
    const blog = await Blog.findById(req.params.id);
    res.render('blogs/blog', { title: blog.title, blog });
  } catch (error) {
    res.status(404).render('404', { title: 'Blog not found' });
  }
}

async function blog_delete(req, res) {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ redirect: '/blogs/deleted' });
  } catch (error) {
    console.error(error);
  }
}

async function blog_create_post(req, res) {
  try {
    await Blog.create(new Blog(req.body));
    res.redirect('/blogs/posted');
  } catch (error) {
    console.error(error);
  }
}

function blog_create_get(req, res) {
  res.render('blogs/new-blog', { title: 'New Blog' });
}

function blog_posted(req, res) {
  res.render('blogs/blog-posted', { title: 'Blog Posted' });
}

function blog_deleted(req, res) {
  res.render('blogs/blog-deleted', { title: 'Blog Deleted' });
}

module.exports = {
  blog_index,
  blog_details,
  blog_delete,
  blog_create_post,
  blog_create_get,
  blog_posted,
  blog_deleted,
};
