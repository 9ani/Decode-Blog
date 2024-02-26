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
        const imageUrl = await getPhoto(req.body.title); // Pass title as an argument
        console.log('Fetched Image URL:', imageUrl);

          const currentDate = new Date();
          const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getFullYear()}`;
          const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

          const blog = new Blog({
              title: req.body.title,
              category: req.body.category,
              time: `${formattedTime} - ${formattedDate}`,
              image: imageUrl,
              description: req.body.description,
              author: req.user._id,
          });

          console.log(blog);
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
  if (
    req.body.title.length > 2 &&
    req.body.category > 0 &&
    req.body.time > 10 &&
    req.body.description.length > 2
  ) {
    const imageUrl = await getBlogPhotoUrl(req.body.title); // Fetch image URL from Unsplash API
    const blog = await Blog.findById(req.body.id);
    fs.unlinkSync(path.join(__dirname, '../../../public', blog.image));

    await Blog.findByIdAndUpdate(req.body.id, {
      title: req.body.title,
      category: req.body.category,
      time: req.body.time,
      image: imageUrl,
      description: req.body.description,
      author: req.user._id,
    });
    res.redirect('/admin/' + req.user._id);
  } else {
    res.redirect(`/edit/${req.body.id}?error=1`);
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


module.exports = {
  createBlog,
  editBlog,
  getPhoto
};
