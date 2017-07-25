const init = (data) => {
    const controller = {
        showUserProfile(req, res) {
            const removedString = ':users=';
            const username = req.params.users.substr(removedString.length);
            return data.users.findByUserName(username)
                .then((user) => {
                    return res.render('users/profiles', {
                        context: user,
                    });
                });
        },

        // showUserPosts(res, req) {
        //     const removedString = ':users=';
        //     const username = req.params.users.substr(removedString.length);
        //     return data.users.findByUserName(username)
        //         .then((user) => {
        //             return res.render('users/posts', {
        //                 context: user,
        //             });
        //         });
        // },
    };

    return controller;
};


module.exports = { init };
