const {Router} = require('express');
const router =  Router();

const { renderIndex, renderTlahco} = require('../controllers/index.controllers');

router.get('/', renderIndex);




module.exports = router;
