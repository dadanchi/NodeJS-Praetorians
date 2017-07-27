const init = (data) => {
    const controller = {
        showUserProfile(req, res) {
            const removedString = ':user=';
            const username = req.params.user.substr(removedString.length);
            return data.users.findByUserName(username)
                .then((user, topic) => {
                    if (typeof(user) === 'undefined') {
                        return res.render('error');
                    }
                    return res.render('users/profiles', {
                        context: user,
                    });
                });
        },
    };

    return controller;
};


module.exports = { init };
