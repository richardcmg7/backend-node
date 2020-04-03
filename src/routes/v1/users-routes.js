const express = require('express');
const {isAuth, isValidHostName} = require('../../middlewares/auth')

const usersController = require('../../controller/v1/users-controller');

const router = express.Router();
router.post('/create', usersController.createUser);
router.post('/login', usersController.login);
router.post('/update', isValidHostName, isAuth, usersController.updateUser);
router.post('/delete', isAuth, usersController.deleteUser);
router.get('/get-all', usersController.getUsers);

module.exports = router;
 