const express = require('express')
const router = express.Router()
const { createBlog, editBlog, getPhoto } = require('./controller');

router.post('/api/blogs/new', createBlog);
router.post('/api/blogs/edit', editBlog);

module.exports = router