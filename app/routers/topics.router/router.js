const { Router } = require('express');
const Topic = require('../../../models/topic.model');

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
    // TODO add a comment route
        .post('/:title/comments', (req, res) => {
            const removedString = ':title=';
            const title = req.params.title.substr(removedString.length);
            const comment = req.body.comment;

            return data.topics.findByTitle(title)
                .then((topic) => {
                    topic.comments.push(comment);
                })
                .then(() => {
                    return res.redirect(`/topics/:title=${title}`);
                });
        })
        .post('/', (req, res) => {
            const topic = req.body;
            topic.comments = [];

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
