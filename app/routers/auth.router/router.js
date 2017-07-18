const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();

    router
        .get('/sign-in', (req, res) => {
            return res.render('auth/form');
                });

    app.use('/auth', router);
};

module.exports = { attachTo };
