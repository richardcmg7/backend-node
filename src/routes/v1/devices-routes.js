const express = require('express');
// const { isAuth, isValidHostName } = require('../../middlewares/auth')

const devicesController = require('../../controller/v1/devices-controller');

const router = express.Router();

router.post('/:request', devicesController.createData );
// router.post('/login', usersController.login);
// router.post('/update', isValidHostName, usersController.updateUser);
// router.post('/delete', isAuth, usersController.deleteUser);
// router.get('/get-all', usersController.getUsers);

module.exports = router;
