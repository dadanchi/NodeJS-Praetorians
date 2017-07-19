class UsersController {
    constructor(data) {
        this.data = data;
    }

    getSignUpForm(req, res) {
        return res.render('auth/sign-up');
    }
    getSignInForm(req, res) {
        return res.render('auth/sign-in');
    }
    signOut(req, res) {
        req.logout();
        return res.redirect('/');
    }

    signUp(req, res) {
        const bodyUser = req.body;
        this.data.users.findByUserName(bodyUser.username)
            .then((dbUser) => {
                if (dbUser) {
                    throw new Error('User already exists');
                }
                return this.data.users.create(bodyUser);
             })
            .then((dbUser) => {
                return res.redirect('/');
            });
            // .catch((err) => {
            //     req.flash('error', err);
            // });
    }
}

const init = (data) => {
    return new UsersController(data);
};

module.exports = { init };
