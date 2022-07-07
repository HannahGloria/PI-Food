const { Router } = require('express');
const router = Router ();
const { getRecipes } = require('../controllers/recipeController');

router.get('/getRecipes', getRecipes);

module.exports = router;