const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    app.get('/topics', (req, res) => {
        // auth
        return controller.getAll(req, res);
    });

    app.get('/topics/form', (req, res) => {
        return res.render('topics/form');
    });

    app.post('/topics', (req, res) => {
        const item = req.body;

        // validate item
        return data.topics.create(item)
            .then((topic) => {
                return res.redirect('/topics');
            })
            .catch((err) => {
                // connect-flash
                req.flash('error', err);
                return res.redirect('/topics/form');
            });
    });
};

module.exports = { attachTo };
