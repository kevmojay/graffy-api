const express = require('express');
const controller = require('../controllers/users');

const router = express.Router();

router.get('/', controller.allUsers);
router.post('/', controller.addUser);

module.exports = router;
