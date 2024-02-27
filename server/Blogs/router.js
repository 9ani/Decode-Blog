const express = require('express');
const router = express.Router();
const { createBlog, editBlog, getPhoto, deleteBlog } = require('./controller');

router.post('/api/blogs/new', createBlog);
router.post('/api/blogs/edit', editBlog);
router.delete('/api/blogs/:id', deleteBlog);

module.exports = router;