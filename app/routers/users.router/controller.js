const init = (data) => {
    const controller = {
        showUserProfile(req, res) {
            const removedString = ':user=';
            const username = req.params.user.substr(removedString.length);
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
            const removedString = ':user=';
            const username = req.params.user.substr(removedString.length);
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
            const removedString = ':user=';
            const username = req.params.user.substr(removedString.length);
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
