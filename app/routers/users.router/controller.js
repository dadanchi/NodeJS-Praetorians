const init = (data) => {
    const controller = {
        showUserProfile(req, res) {
            const username = req.params.user;
            return data.users.findByUserName(username)
                .then((user) => {
                    if (typeof (user) === 'undefined') {
                        return res.render('error');
                    }
                    return res.render('users/profiles', {
                        context: user,
                    });
                });
        },
        getUpdateProfilPage(req, res) {
            const username = req.params.user;
            return data.users.findByUserName(username)
                .then((user) => {
                    if (typeof (user) === 'undefined') {
                        return res.render('error');
                    }
                    return res.render('users/updateProfil', {
                        context: user,
                    });
                });
        },

        updateProfilInfo(req, res) {
            const username = req.params.user;
            const bodyUser = req.body;
            return data.users.findByUserName(username)
                .then((user) => {
                    if (typeof (user) === 'undefined') {
                        return res.render('error');
                    }
                    return data.users.updateProfil(bodyUser, user, req, res)
                        .then(() => {
                            return res.render(`home`);
                        });
                });
        },
    };

    return controller;
};


module.exports = { init };
