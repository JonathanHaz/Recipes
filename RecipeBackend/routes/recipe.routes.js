const recipes = require('../controllers/recipe.controller');
const express = require('express');
const { auth } = require('../middleware/auth.middleware')
const router = express.Router();
const upload = require('../middleware/upload')


router.post("/createRecipe", auth, recipes.createRecipe);
router.get('/getRecipes', recipes.getRecipes)
router.get('/getRecipe/:id', recipes.GetRecipeById)
router.get('/getRecipesByUser/:userId', recipes.getRecipesByUserId);
router.post('/image', auth ,upload.single("recipeIMG"), recipes.addImageRecipe)

    




module.exports = router;