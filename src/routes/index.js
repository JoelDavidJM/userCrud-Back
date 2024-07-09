const express = require('express');
const userRouter = require('./user.router');
const router = express.Router();

// put the routes here
router.use(userRouter)

module.exports = router;
