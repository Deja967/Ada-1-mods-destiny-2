const express = require('express');
const router = express.Router();

const controller = require('../controller/user.controller');

router.get('/get-users', controller.getUsers);
router.post('/add-user', controller.addUser);
router.delete('/delete-user', controller.deleteUser);

module.exports = router;
