const { Router } = require('express');


const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    const router = new Router();

    router
        .get('/:users', (req, res) => {
            return controller.showUserProfile(req, res);
        });
        // .get('/posts', (res, req) => {
        //     return controller.showUserPosts(res, req);
        // });
    app.use('/', router);
};
module.exports = { attachTo };
