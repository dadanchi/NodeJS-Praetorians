/* eslint linebreak-style: ["error", "windows"]*/
const { Router } = require('express');

const attachTo = (app, data) => {
    const apiRouter = new Router();

    apiRouter
        .get('/', (req, res) => {
            console.log('omega');
            return res.send('Hello');
                });
};

module.exports = { attachTo };
