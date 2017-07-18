const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();

    router
        .get('/sign-in', (req, res) => {
            return res.render('auth/loginForm');
                })
        .get('/sign-up', (req, res) => {
            return res.render('auth/regForm');
                });

    app.use('/auth', router);
};

module.exports = { attachTo };
