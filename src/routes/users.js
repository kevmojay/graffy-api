const express = require('express');
const controller = require('../controllers/users');

const router = express.Router();

router.get('/', controller.allUsers);
router.post('/', controller.addUser);
router.post('/userById', controller.getUserById);
router.post('/checkIfExistsById', controller.checkIfUserExists);

module.exports = router;
