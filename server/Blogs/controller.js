const Blog = require('./Blog');
const fs = require('fs');
const path = require('path');
const User = require('../auth/User')

const createBlog = async (req, res) => {
  if(req.file && req.body.title.length > 2 && 
    req.body.description.length > 2  )
{
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getFullYear()}`;
      const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

      await new Blog({
        title: req.body.title,
        category: req.body.category,
        time: `${formattedTime} - ${formattedDate}`,
        image: `/images/blogs/${req.file.filename}`, 
        description: req.body.description,
        author: req.user._id,
      }).save();
      res.redirect(`/`);    
  } else {
    res.redirect('/new?error=1');
  }
};

const editBlog = async (req, res) => {
  if(req.file && req.body.title.length > 2 && 
    req.body.description.length > 2  ){



      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getFullYear()}`;
      const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

      await Blog.findByIdAndUpdate(req.body.id, {
        title: req.body.title,
        category: req.body.category,
        time: `${formattedTime} - ${formattedDate}`,
        image: `/images/blogs/${req.file.filename}`,
        description: req.body.description,
        author: req.user._id,
      }, { new: true }); 

      res.redirect('/');
    } else{
      res.redirect(`/edit/${req.body.id}?error=1`)
  }
  
};

const deleteBlog = async (req, res) => {
  try {
      const  blog = await Blog.findById(req.params.id);

      if (!blog) {
          return res.status(404).send('Not found');
      }

      const filePath = path.join(__dirname, '../../../decode_blog/public', blog.image);
      console.log('Deleting file at path:', filePath);

      if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
      }

      await Blog.findByIdAndDelete(req.params.id);

      res.status(200).send('ok');
  } catch (error) {
      console.error('Error deleting film:', error);
      res.status(500).send('Internal Server Error');
  }
};


module.exports = {
  createBlog,
  editBlog,
  deleteBlog,
};