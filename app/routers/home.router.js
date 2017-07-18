/* eslint linebreak-style: ["error", "windows"]*/
const { Router } = require('express');

const attachTo = (app, data) => {
    const apiRouter = new Router();

    apiRouter
        .get('/', (req, res) => {
            return res.render('home');
                });

    app.use('/', apiRouter);
};

module.exports = { attachTo };
