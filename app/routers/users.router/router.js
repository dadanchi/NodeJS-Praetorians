const { Router } = require('express');

const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    const router = new Router();

    router
        .get('/:user', (req, res) => {
            if (req.user) {
                return controller.showUserProfile(req, res);
            }
            return res.redirect('/topics');
        });
    app.use('/users', router);
};
module.exports = { attachTo };
