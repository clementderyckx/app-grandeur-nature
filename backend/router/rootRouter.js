const express = require('express');
const rootRouter = express.Router();


rootRouter.get('/', (req, res, next) => {
    res.send('Not allowed to be here');
});

module.exports = rootRouter;