const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            return res.render('auth/form');
                });

    app.use('/authenticate', router);
};

module.exports = { attachTo };
