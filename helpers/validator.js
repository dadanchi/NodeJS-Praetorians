const notifier = require('node-notifier');
const strToRemove = 'http://localhost:3001';

const validatePassword = (req, res, password) => {
    const redirectDirectory = req.headers.referer.substr(strToRemove.length);
    if (password === '' || password === null) {
        notifier.notify('Enter password');
        res.redirect(redirectDirectory);
        return false;
    }

    if (password.length < 6) {
        notifier.notify('Password must be at least 6 chars long');
        res.redirect(redirectDirectory);
        return false;
    }

    if (password.match(/[^a-zA-Z0-9 ]/)) {
        notifier.notify('Password must contain only letters a-zA-Z and digits 0-9');
        res.redirect(redirectDirectory);
        return false;
    }

    if (password.includes(' ')) {
        notifier.notify('Password must not contain white spaces');
        res.redirect(redirectDirectory);
        return false;
    }

    return true;
};

const validateUsername = (req, res, username) => {
    const redirectDirectory = req.headers.referer.substr(strToRemove.length);
    if (username === '' || username === null) {
        notifier.notify('Enter username');
        res.redirect(redirectDirectory);
        return false;
    }

    if (username.length < 3 || typeof username !== 'string') {
        notifier.notify('Username must be at least 3 chars long string');
        res.redirect(redirectDirectory);
        return false;
    }

    if (username.match(/[^a-zA-Z0-9 ]/)) {
        notifier.notify('Username must contain only letters a-zA-Z and digits 0-9');
        res.redirect(redirectDirectory);
        return false;
    }

    if (username.includes(' ')) {
        notifier.notify('Username must not contain white spaces');
        res.redirect(redirectDirectory);
        return false;
    }
    return true;
};

const validateName = (req, res, name) => {
    const redirectDirectory = req.headers.referer.substr(strToRemove.length);

    if (name !== null || name !== '' || name !== 'undefined') {
        if (name.match(/[^a-zA-Z ]/)) {
            notifier.notify('Name name must contain only letters a-zA-Z.');
            res.redirect(redirectDirectory);
            return false;
        }
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

const validateTown = (req, res, town) => {
    const redirectDirectory = req.headers.referer.substr(strToRemove.length);

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
    validateTown,
    validateName,
};
