const { Router } = require('express');

const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    const router = new Router();

    router
        .get('/', (req, res) => {
            return controller.getAll(req, res);
        })
        .get('/form', (req, res) => {
            return res.render('topics/form');
        })
        .get('/:title', (req, res) => {
            const removedString = ':title=';
            const title = req.params.title.substr(removedString.length);
            return data.topics.findByTitle(title)
                .then((topic) => {
                    return res.render('topics/comments', {
                        topic: topic,
                    });
                });
            // get the comments about the topic here
        })
        .post('/', (req, res) => {
            const topic = req.body;
            // validate item
            return data.topics.create(topic)
                .then((top) => {
                    return res.redirect('/topics');
                })
                .catch((err) => {
                    return res.redirect('/form');
                });
        });
    app.use('/topics', router);
};

module.exports = { attachTo };
