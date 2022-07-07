const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const recipe = require('./recipe');
const diet = require('./diet');
const recipes = require('./recipes');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipe', recipe)
router.use('/diet', diet)
router.use('/recipes', recipes)


module.exports = router;
