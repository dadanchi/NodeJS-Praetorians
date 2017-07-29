const { Router } = require('express');

const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    const router = new Router();

    router
        .get('/:user/updateProfil', (req, res) => {
            return controller.getUpdateProfilPage(req, res);
        })
        .get('/:user', (req, res) => {
                return controller.showUserProfile(req, res);
        })
        .post('/:user', (req, res) => {
            return controller.updateProfilInfo(req, res);
        });
    app.use('/users', router);
};
module.exports = { attachTo };
