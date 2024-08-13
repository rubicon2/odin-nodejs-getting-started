const express = require('express');
const {
  blog_index,
  blog_details,
  blog_delete,
  blog_create_post,
  blog_create_get,
  blog_posted,
  blog_deleted,
} = require('../controller/blogController');

const router = express.Router();

router.get('/', blog_index);

// This needs to go before /blogs/:id otherwise it won't load.
router.get('/create', blog_create_get);

// This needs to go before /blogs/:id otherwise it won't load.
router.get('/posted', blog_posted);

// This needs to go before /blogs/:id otherwise it won't load.
router.get('/deleted', blog_deleted);

router.get('/:id', blog_details);

router.delete('/:id', blog_delete);

router.post('/', blog_create_post);

module.exports = router;
