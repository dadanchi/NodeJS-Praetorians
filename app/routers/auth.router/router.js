const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/sign-in', (req, res) => {
            return res.render('auth/loginForm');
        })
        .post('/sign-in', controller.signIn())
        .get('/sign-up', (req, res) => {
            res.render('auth/regForm');
        })
        .post('/sign-up', (req, res) => {
            return controller.signUp(req, res);
        })
        .get('/sign-out', (req, res) => {
            req.logout();
            res.redirect('/');
        });

app.use('/auth', router);
};

module.exports = { attachTo };
