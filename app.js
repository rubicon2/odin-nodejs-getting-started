const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { ObjectId } = mongoose.Types.ObjectId;

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

const uri =
  'mongodb+srv://liam:qusx5H5L9lgfCXcq@learn.zme72.mongodb.net/?retryWrites=true&w=majority&appName=Learn';
mongoose
  .connect(uri)
  .then((result) => {
    console.log('Connected to db');
    app.listen(8080);
  })
  .catch((error) => console.error(error));

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render('index', { title: 'Home', blogs });
  } catch (error) {
    console.error(error);
  }
});

// This needs to go before /blogs/:id otherwise it won't load.
app.get('/blogs/create', (req, res) => {
  res.render('new-blog', { title: 'New Blog' });
});

// This needs to go before /blogs/:id otherwise it won't load.
app.get('/blogs/posted', (req, res) => {
  res.render('blog-posted', { title: 'Blog Posted' });
});

// This needs to go before /blogs/:id otherwise it won't load.
app.get('/blogs/deleted', (req, res) => {
  res.render('blog-deleted', { title: 'Blog Deleted' });
});

app.get('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.render('blog', { title: blog.title, blog });
  } catch (error) {
    console.error(error);
  }
});

app.post('/blogs', async (req, res) => {
  try {
    await Blog.create(new Blog(req.body));
    res.redirect('/blogs/posted');
  } catch (error) {
    console.error(error);
  }
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// Only runs if none of the other get requests match.
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
