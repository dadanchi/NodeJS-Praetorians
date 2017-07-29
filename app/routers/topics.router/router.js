const { Router } = require('express');

const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    const router = new Router();

    router
        .get('/', (req, res) => {
            return controller.getAll(req, res);
        })
        .post('/', (req, res) => {
            return controller.addTopic(req, res);
        })
        .get('/filtered', (req, res) => {
            return controller.searchTopic(req, res);
        })
        .get('/form', (req, res) => {
            if (req.user) {
                return res.render('topics/form');
            }
            return res.redirect('/topics');
        })
        .get('/:title', (req, res) => {
            return controller.getCurrentTopic(req, res);
        })
        .post('/:title/:commentId/edit', (req, res) => {
            return controller.edit(req, res);
        })
        .post('/:title/:commentId/delete', (req, res) => {
            return controller.delete(req, res);
        })
        .post('/:title/comments', (req, res) => {
            return controller.addComment(req, res);
        });


    app.use('/topics', router);
};

module.exports = { attachTo };
