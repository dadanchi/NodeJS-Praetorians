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
            // validation server side
            return Promise.resolve(data.comments.create(comment))
                .then((newComm) => {
                    return Promise.resolve(data.users.addComment(newComm))
                        .then(() => {
                            delete topic.content;
                            topic.comments = [];
                            topic.comments.push(newComm);
                            // req.user.comments = [];
                            // req.user.comments.push(comment);
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
            const removedString = ':title=';
            const title = req.params.title.substr(removedString.length);
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
                            topic.comments.slice((page - 1) * size, page * size);
                    }
                    return res.render('topics/comments', {
                        topic: topic,
                    });
                });
        },

        addComment(req, res) {
            const removedString = ':title=';
            const title = req.params.title.substr(removedString.length);
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
                                    return res.redirect(`/topics/:title=${title}`);
                                });
                        });
                });

            // for debugging
            // .catch((err) => {
            //     console.log(err);
            //     return res.redirect(`/topics/:title=${title}`);
            // });
        },
    };

    return controller;
};

module.exports = { init };
