const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types.ObjectId;

const blogRoutes = require('./routes/blogRoutes');

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

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

app.use('/blogs', blogRoutes);

// Only runs if none of the other get requests match.
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
