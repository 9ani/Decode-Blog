const express = require('express');
const router = express.Router();
const i18next = require('i18next');

router.get('/switch-language', (req, res) => {
    const { lang } = req.query;
    i18next.changeLanguage(lang); // Use i18next to change language
    res.cookie('lang', lang, { httpOnly: true });
    res.redirect('back');
});

module.exports = router;
