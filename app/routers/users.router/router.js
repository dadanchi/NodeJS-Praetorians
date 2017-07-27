const { Router } = require('express');

const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    const router = new Router();

    router
        .get('/:user', (req, res) => {

                return controller.showUserProfile(req, res);
            // expect todo --> popup message
        });
    app.use('/users', router);
};
module.exports = { attachTo };
