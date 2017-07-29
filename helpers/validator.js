const notifier = require('node-notifier');

const validatePassword = (req, res, password) => {
    if (password === '' || password === null) {
        notifier.notify('Enter password');
        res.redirect('/auth/sign-up');
        return false;
    }

    if (password.length < 6) {
        notifier.notify('Password must be at least 6 chars long');
        res.redirect('/auth/sign-up');
        return false;
    }

    if (password.match(/[^a-zA-Z0-9 ]/)) {
        notifier.notify('Password must contain only letters a-zA-Z and digits 0-9');
        res.redirect('/auth/sign-up');
        return false;
    }

    if (password.includes(' ')) {
        notifier.notify('Password must not contain white spaces');
        res.redirect('/auth/sign-up');
        return false;
    }
    return true;
};

const validateUsername = (req, res, username) => {
    if (username === '' || username === null) {
        notifier.notify('Enter username');
        res.redirect('/auth/sign-up');
        return false;
    }

    if (username.length < 3 || typeof username !== 'string') {
        notifier.notify('Username must be at least 3 chars long string');
        res.redirect('/auth/sign-up');
        return false;
    }

    if (username.match(/[^a-zA-Z0-9 ]/)) {
        notifier.notify('Username must contain only letters a-zA-Z and digits 0-9');
        res.redirect('/auth/sign-up');
        return false;
    }

    if (username.includes(' ')) {
        notifier.notify('Username must not contain white spaces');
        res.redirect('/auth/sign-up');
        return false;
    }
    return true;
};

const validatePasswordUpdate = (req, res, password, user) => {
    const redirectDirectory = `/users/:user=${user.username}/updateProfil`;

    if (password !== null || password !== '' || password !== 'undefined') {
        if (password.length < 6) {
            notifier.notify('Password must be at least 6 chars long');
            res.redirect(redirectDirectory);
            return false;
        }

        if (password.includes(' ')) {
            notifier.notify('Password must not contain white spaces');
            res.redirect(redirectDirectory);
            return false;
        }
    }
    return true;
};

const validateFirstNameUpdate = (req, res, firstname, user) => {
    const redirectDirectory = `/users/:user=${user.username}/updateProfil`;

    if (firstname !== null || firstname !== '' || firstname !== 'undefined') {
        if (firstname.match(/[^a-zA-Z ]/)) {
            notifier.notify('First name must contain only letters a-zA-Z.');
            res.redirect(redirectDirectory);
            return false;
        }
    }
    return true;
};

const validateLastNameUpdate = (req, res, lastname, user) => {
    const redirectDirectory = `/users/:user=${user.username}/updateProfil`;

    if (lastname !== null || lastname !== '' || lastname !== 'undefined') {
        if (lastname.match(/[^a-zA-Z ]/)) {
            notifier.notify('Last name must contain only letters a-zA-Z.');
            res.redirect(redirectDirectory);
            return false;
        }
    }
    return true;
};

const validateTownUpdate = (req, res, town, user) => {
    const redirectDirectory = `/users/:user=${user.username}/updateProfil`;

    if (town !== null || town !== '' || town !== 'undefined') {
        if (town.length < 2) {
            notifier.notify('Town must be at least 2 chars long');
            res.redirect(redirectDirectory);
            return false;
        }
        if (town.match(/[^a-zA-Z ]/)) {
            notifier.notify('Town name must contain only letters a-zA-Z.');
            res.redirect(redirectDirectory);
            return false;
        }
    }
    return true;
};


module.exports = {
    validatePassword,
    validateUsername,
    validatePasswordUpdate,
    validateFirstNameUpdate,
    validateLastNameUpdate,
    validateTownUpdate,
};
