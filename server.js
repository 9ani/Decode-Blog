const express = require('express');
const session = require('express-session');
const mongooseStore = require('connect-mongo');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware'); 
const switchLanguageRouter = require('./server/pages/switch-language');

const app = express();

require('./server/config/db');
require('./server/config/passport');

app.set("view engine", "ejs");
app.use(switchLanguageRouter);

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.json());

app.use(session({
    name: 'blog.session',
    secret: 'keyboard cat',
    maxAge: 1000 * 60 * 60 * 7,
    resave: false,
    store: mongooseStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/blog',
    }),
}));

i18next
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        resources: {
            en: {
                translation: require('./locales/en.json'),
            },
            ru: {
                translation: require('./locales/ru.json'),
            },
        },
        fallbackLng: 'en',
        preload: ['en', 'ru'],
        saveMissing: true,
        detection: {
            order: ['cookie', 'header'],
        },
    });

app.use(i18nextMiddleware.handle(i18next));

app.locals.__ = i18next.t;


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
