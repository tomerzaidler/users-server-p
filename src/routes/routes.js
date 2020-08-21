const Router = require('express').Router;
const router = new Router();

router.use('/users', require('./api/users'));

module.exports = router;
