const cookbook = require('../controllers/cookbook.controller');
const express = require('express');
const {auth} = require('../middleware/auth.middleware')
const upload = require('../middleware/upload')
const router = express.Router();


router.post('/addRecipe', cookbook.addRecipe);
router.get('/getCookbooks', cookbook.getCookBooks);
router.get('/getCookbook/:id', cookbook.getCookBookById);
router.patch('/updateCookbook', cookbook.updateCookBook)
router.post('/createCookBook',auth, cookbook.createCookBook);
router.delete('/deleteCookbook/:id', cookbook.deleteCookBook)
router.get('/getCookBookByUser/:userId', cookbook.getCookBooksByUserId);



module.exports = router