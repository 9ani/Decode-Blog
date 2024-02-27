const express = require('express');
const session = require('express-session');
const mongooseStore = require('connect-mongo');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path'); // Include path module
const methodOverride = require('method-override');


const app = express();

require('./server/config/db');
require('./server/config/passport');

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "/public"))); // Use path.join for static file serving
app.use(express.urlencoded({ extended: true })); // Use extended: true for bodyParser

app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.json());
app.use(session({
    name: 'blog.session',
    secret: 'keyboard cat',
    maxAge: 1000 * 60 * 60 * 7,
    resave: false,
    store: mongooseStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/blog', // Provide database name
    }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(require('./server/pages/router'));
app.use(require('./server/Categories/router'));
app.use(require('./server/auth/router'));
app.use(require('./server/Blogs/router'));
app.use(require('./server/Admin/router'));


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
