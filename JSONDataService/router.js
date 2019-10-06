const express = require('express');
const UserController = require('./controller');
const router = express.Router();

const controller = new UserController;

router.get('/users', controller.getAllUsers);

router.get('/users/:id', controller.getUser);

router.post('/users', controller.addUser);

router.put('/users/:id', controller.updateUser);

router.delete('/users/:id', controller.deleteUser);


module.exports = router;

