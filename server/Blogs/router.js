// In router.js

const express = require('express');
const router = express.Router();
const { createBlog, editBlog, getPhoto, deleteBlog, searchBlogs } = require('./controller');

router.post('/api/blogs/new', createBlog);
router.post('/api/blogs/edit', editBlog);
router.delete('/api/blogs/:id', deleteBlog);
router.get('/api/blogs/search', searchBlogs); // Use the search function

module.exports = router;
