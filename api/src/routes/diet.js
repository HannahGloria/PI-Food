const { Router } = require('express');
const router = Router();
const { getDiet } = require('../controllers/dietController');

router.get('/getDiet', getDiet);

module.exports = router;