const { Router } = require('express');
const Topic = require('../../../models/topic.model');
const helper = require('../../../helpers/helpers');

const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    const router = new Router();

    router
        .get('/', (req, res) => {
            return controller.getAll(req, res);
        })
        .post('/', (req, res) => {
            const topic = req.body;
            topic.author = req.user.username;
            // validation server side
            const comment = {
                content: topic.content,
                author: req.user.username,
                date: helper.getDate(),
            };
            delete topic.content;
            topic.comments = [];
            topic.comments.push(comment);

            return data.topics.create(topic)
                .then((top) => {
                    return res.redirect('/topics');
                })
                .catch((err) => {
                    return res.redirect('/form');
                });
        })

        .get('/filtered', (req, res) => {
            const searh = req.query.searh;
            return data.topics.findBy(searh)
                .then((topics) => {
                    return res.render('topics/allFiltered', {
                        topics: topics,
                    });
                });
        })
        .get('/form', (req, res) => {
            if (req.user) {
                return res.render('topics/form');
            }
            // expect todo --> popup message
            return res.redirect('/topics');
        })


        .get('/:title', (req, res) => {
            const removedString = ':title=';
            const title = req.params.title.substr(removedString.length);
            const page = req.query.page || 1;
            const size = 2;
            return data.topics.findByTitle(title)
                .then((topic) => {
                    if (topic.comments.length !== 0) {
                        // catch error
                        topic.comments = topic.comments.slice((page-1) * size, page * size);
                    }
                    return res.render('topics/comments', {
                        topic: topic,
                    });
                });
            // get the comments about the topic here
        })
        // .get('/:page', (req, res) => {
        //     return controller.getPages(req, res);
        // })
        // TODO add a comment route
        .post('/:title/comments', (req, res) => {
            const removedString = ':title=';
            const title = req.params.title.substr(removedString.length);
            const comment = {
                topic: title,
                content: req.body.comment,
                author: req.user.username,
            };

            return Promise.all([
                data.users.addComment(comment),
                data.topics.addComment(comment),
            ])
                .then(() => {
                    return res.redirect(`/topics/:title=${title}`);
                });
            // for debugging
            // .catch((err) => {
            //     console.log(err);
            //     return res.redirect(`/topics/:title=${title}`);
            // });
        });

    app.use('/topics', router);
};

module.exports = { attachTo };
