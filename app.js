const express = require('express');
const morgan = require('morgan');

const app = express();
app.set('view engine', 'ejs');
app.listen(8080);

app.use(morgan('combined'));

app.get('/', (req, res) => {
  const blogs = [
    { title: 'Blog 1', snippet: 'I am a blog one' },
    { title: 'Blog 2', snippet: 'I am a blog two' },
    { title: 'Blog 3', snippet: 'I am a blog three' },
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/blogs/create', (req, res) => {
  res.render('new-blog', { title: 'New Blog' });
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
