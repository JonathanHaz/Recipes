const user = require('../controllers/user.controller');
const {auth} = require('../middleware/auth.middleware')
const upload = require('../middleware/upload')
const express = require('express');
const router = express.Router();


router.post("/register", user.Register);
router.post("/login", user.Login);
router.post('/image', auth ,upload.single("profileIMG"), user.addImageUser)
router.get('/getUser/db',auth, user.getUser)
router.get('/getUsers', user.getUsers)



module.exports = router;