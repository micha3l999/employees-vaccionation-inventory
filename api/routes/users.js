var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');

/* GET users listing. */
router.get('/', usersController.getUsers);

/* GET user by id */
router.get('/:identification', usersController.getUser);

/* POST user */
router.post('/', usersController.postUser);

/* PUT update user */
router.put('/', usersController.putUser);

/* POST login api */
router.post('/login', usersController.postLogin);

/* PUT disharge a patiente */
router.put('/discharge-patiente/:identification', usersController.putDischargePatiente);

/* POST disharge a patiente when creating */
router.post('/discharge-patiente/', usersController.postDischargePatiente);

module.exports = router;
