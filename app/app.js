/* eslint linebreak-style: ["error", "windows"]*/
const express = require('express');
const init = (data) => {
    const app = express();

    app.set('view engine', 'pug');
    require('./routers')
        .attachTo(app, data);

    return Promise.resolve(app);
};

module.exports = {
    init,
};
