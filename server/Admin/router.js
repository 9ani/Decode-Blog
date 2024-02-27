const express = require('express');
const router = express.Router();
const { addUser, editUserbyAdmin, deleteUser } = require('./controller');

router.post('/admin/addUser', addUser);
router.put('/admin/edit/:id', editUserbyAdmin);
router.delete('/admin/delete/:id', deleteUser);

module.exports = router;