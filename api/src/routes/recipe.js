const { Router } = require('express');
const router = Router ();
const { getById, postRecipes } = require('../controllers/recipeController');

router.get('/:id', getById);
router.post('/create', postRecipes);

module.exports = router;