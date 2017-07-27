const init = (data) => {
    const controller = {
        getAll(req, res) {
            let { page } = req.query;
            page = page || 1;
            const size = 2;
            return data.topics.getAllTopics()
                .then((topics) => {
                    // catch error
                        topics = topics.slice((page - 1) * size, page * size);
                    return res.render('topics/all', {
                        context: topics,
                    });
                });
        },
    };

    return controller;
};

module.exports = { init };
