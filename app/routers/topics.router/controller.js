const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.topics.getAll()
                .then((topics) => {
                    return res.render('topics/all', {
                        context: topics,
                    });
                });
        },
    };

    return controller;
};


module.exports = { init };
