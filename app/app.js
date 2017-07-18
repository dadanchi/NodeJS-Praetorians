/* eslint linebreak-style: ["error", "windows"]*/
/* globals __dirname */
const express = require('express');
const path = require('path');
const init = (data) => {
    const app = express();

    app.set('view engine', 'pug');
    require('./routers')
        .attachTo(app, data);

    const libsPath = path.join(__dirname, '../node_modules/');
    app.use('/libs', express.static(libsPath));

    const staticsPath = path.join(__dirname, '../static');
    app.use('/static', express.static(staticsPath));

    return Promise.resolve(app);
};

module.exports = {
    init,
};
