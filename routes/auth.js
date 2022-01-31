const express = require("express");
const router = express.Router()
const {
    registor,
    login,
  } =  require('../controllers/auth')

router.route('/register').post(registor)
router.route('/login').post(login)

module.exports = router