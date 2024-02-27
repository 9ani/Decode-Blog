const Blog = require('./Blog');
const fs = require('fs');
const path = require('path');
const axios = require('axios'); // Import axios for making API requests

const createBlog = async (req, res) => {
  if (!req.user) {
    res.redirect('/login');
    return;
  }
  if (
    req.body.title.length > 2 &&
    req.body.description.length > 2
  ) {
    try {
      // Call getPhoto function three times
      const imageUrl1 = await getPhoto(req.body.title);
      const imageUrl2 = await getPhoto(req.body.title);
      const imageUrl3 = await getPhoto(req.body.title);

      console.log('Fetched Image URLs:', imageUrl1, imageUrl2, imageUrl3);

      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getFullYear()}`;
      const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

      // Create a single blog entry with an array of image URLs
      const blog = new Blog({
        title: req.body.title,
        category: req.body.category,
        time: `${formattedTime} - ${formattedDate}`,
        images: [imageUrl1, imageUrl2, imageUrl3], // Store image URLs in an array
        description: req.body.description,
        author: req.user._id,
      });

      console.log(blog);

      // Save the blog entry
      await blog.save();

      res.redirect(`/`);
    } catch (error) {
      console.error('Error creating blog:', error);
      res.redirect('/new?error=1');
    }
  } else {
    res.redirect('/new?error=1');
  }
};

const editBlog = async (req, res) => {
  try {
    console.log('Edit Blog Request Body:', req.body);

    if (
      req.body.title.length > 2 &&
      req.body.category &&
      req.body.description.length > 2
    ) {
      const imageUrls = await Promise.all([
        getPhoto(req.body.title),
        getPhoto(req.body.title),
        getPhoto(req.body.title),
      ]);

      console.log('Fetched Image URLs:', imageUrls);

      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getFullYear()}`;
      const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

      await Blog.findByIdAndUpdate(req.body.id, {
        title: req.body.title,
        category: req.body.category,
        time: `${formattedTime} - ${formattedDate}`,
        images: imageUrls, // Store image URLs in an array
        description: req.body.description,
        author: req.user._id,
      });

      res.redirect('/');
    } else {
      console.log('Validation Error: Invalid form data');
      res.redirect(`/edit/${req.body.id}?error=1`);
    }
  } catch (error) {
    // Check if the error message is 'No photo found'
    if (error.message === 'No photo found') {
      // Handle the absence of a photo (e.g., provide a default image URL)
      res.redirect('/');
    } else {
      console.error('Error editing blog:', error);
      res.redirect(`/edit/${req.body.id}?error=1`);
    }
  }
};


const getPhoto = async (title) => {
  try {
      const accessKey = 'tjZa3_FiUlmcGH9Y36YkR1dv6d7jJPdRjy9QwElCWyA';
      console.log('Blog Title:', title);
      const apiUrl = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(title)}&client_id=${accessKey}`;

      const response = await axios.get(apiUrl);

      if (response.status === 404) {
          console.log('No photo found for the specified query.');
          throw new Error('No photo found');
      }

      const photoData = response.data;

      if (!photoData.urls || !photoData.urls.regular) {
          throw new Error('Image URL not found in API response');
      }

      return photoData.urls.regular;
  } catch (error) {
      console.error('Error fetching photo:', error.message);
      throw new Error('Internal Server Error');
  }
};


// In Blogs/controller.js

const deleteBlog = async (req, res) => {
  try {
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
          return res.status(404).send('Not found');
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
  getPhoto,
  deleteBlog,
};
