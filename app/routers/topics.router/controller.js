const helper = require('../../../helpers/helpers');

const init = (data) => {
    const controller = {
        getAll(req, res) {
            let { page } = req.query;
            page = page || 1;
            const size = 8;
            return data.topics.getAllTopics()
                .then((topics) => {
                    let croppedPart = (page - 1) * size;
                    // if route of page is too big
                    while (croppedPart >= topics.length) {
                        page -= 1;
                        croppedPart = (page - 1) * size;
                    }
                    topics = topics.slice((page - 1) * size, page * size);
                    return res.render('topics/all', {
                        context: topics,
                    });
                });
        },

        addTopic(req, res) {
            const topic = req.body;
            topic.author = req.user.username;
            const comment = {
                topic: topic.title,
                content: topic.content,
                author: req.user.username,
                authorId: req.user._id,
                date: helper.getDate(),
            };

            return Promise.resolve(data.comments.create(comment))
                .then((newComm) => {
                    return Promise.resolve(data.users.addComment(newComm))
                        .then(() => {
                            topic.comments = [];
                            topic.comments.push(newComm);
                            return data.topics.create(topic)
                                .then((top) => {
                                    return res.redirect('/topics');
                                })
                                .catch((err) => {
                                    return res.redirect('/form');
                                });
                        });
                });
        },

        searchTopic(req, res) {
            const searh = req.query.searh;
            return data.topics.findBy(searh)
                .then((topics) => {
                    return res.render('topics/allFiltered', {
                        topics: topics,
                    });
                });
        },

        getCurrentTopic(req, res) {
            const title = req.params.title;
            let page = req.query.page || 1;
            const size = 8;
            return data.topics.findByTitle(title)
                .then((topic) => {
                    if (topic.comments.length !== 0) {
                        let croppedPart = (page - 1) * size;
                        // if route of page is too big
                        while (croppedPart >= topic.comments.length) {
                            page -= 1;
                            croppedPart = (page - 1) * size;
                        }
                        topic.comments =
                            topic.comments.slice(
                                (page - 1) * size, page * size);
                    }
                    return res.render('topics/comments', {
                        topic: topic,
                    });
                })
                .catch((err) => {
                    return res.render('error');
                });
        },

        addComment(req, res) {
            const title = req.params.title;
            return Promise.resolve(data.topics.findByTitle(title))
                .then((topic) => {
                    const comment = {
                        topic: topic.title,
                        topicId: topic._id,
                        content: req.body.comment,
                        author: req.user.username,
                        authorId: req.user._id,
                        date: helper.getDate(),
                    };
                    return Promise.resolve(data.comments.create(comment))
                        .then((newComm) => {
                            return Promise.all([
                                data.users.addComment(newComm),
                                data.topics.addComment(newComm),
                            ])
                                .then(() => {
                                    return res.redirect(`/topics/${title}`);
                                });
                        });
                });
        },

        edit(req, res) {
            const newContent = req.body.content;
            const id = req.params.commentId;
            const title = req.params.title;
            return Promise.all([
                data.topics.modify(title, newContent, id),
                data.users.updateComment(id, newContent, req, res),
            ])
                .then((modified) => {
                    return res.redirect(`/topics/${title}`);
                });
        },

        delete(req, res) {
            const id = req.params.commentId;
            const title = req.params.title;
            return Promise.resolve(data.topics.deleteComment(title, id))
                .then((modified) => {
                    return res.redirect(`/topics/${title}`);
                });
        },
    };

    return controller;
};

module.exports = { init };
