const express = require('express');
const router = express.Router();
const User = require('../auth/User')
const Blog = require('../Blogs/Blog');
const Categories = require('../Categories/Categories');

router.get('/', async (req, res) => {
    const options = {}
    const categories = await Categories.findOne({key: req.query.category})
    if(categories){
        options.category = categories._id
        res.locals.category = req.query.category
    }
    let page = 0
    const limit = 3

    if(req.query && req.query.page > 0){
        page = req.query.page
    }

    if(req.query.search && req.query.search.length > 0){
        options.$or = [
            {
                title: new RegExp(req.query.search, 'i')
            }
        ]
        res.locals.search = req.query.seacrh
    }
    const totalBlogs = await Blog.countDocuments(options)
    const allCategories = await Categories.find();
    const blogs = await Blog.find(options).skip(page * limit).limit(limit).populate('category').populate('author');
    res.render("index", {
        categories: allCategories,
        user: req.user ? req.user : {},
        blogs,
        pages: Math.ceil(totalBlogs / limit )
    });
});

router.get('/login',(req,res)=>{
    res.render("login", {user: req.user ? req.user : {}})
})
router.get('/register',(req,res)=>{
    res.render("register", {user: req.user ? req.user : {}})
})

router.get('/profile/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        res.render("profile", { user: user , loginUser: req.user});
    } else {
        res.redirect('/not-found');
    }
});
router.get('/admin/:id', async (req, res) => {
    try {
        const allUsers = await User.find();
        const currentUser = await User.findById(req.params.id);

        res.render("adminProfile", { loginUser: currentUser, users: allUsers });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/new', async(req, res)=>{
    const allCategories = await Categories.find()
    res.render("newBlog",{categories: allCategories , user: req.user ? req.user : {}})
})
router.get('/edit/:id', async(req, res)=>{
    const allCategories = await Categories.find()
    const blog = await Blog.findById(req.params.id)


    res.render("editBlog",{categories: allCategories, user: req.user ? req.user : {}, blog})
})
router.get('/not-found', (req, res) => {
    res.render("notfound");
});


module.exports = router