const strToRemove = 'http://ec2-35-156-216-209.eu-central-1.compute.amazonaws.com';

const validatePassword = (req, res, password) => {
    const redirectDirectory = req.headers.referer.substr(strToRemove.length);
    if (password === '' || password === null) {
        res.redirect(redirectDirectory);
        return false;
    }

    if (password.length < 6) {
        res.redirect(redirectDirectory);
        return false;
    }

    if (password.match(/[^a-zA-Z0-9 ]/)) {
        res.redirect(redirectDirectory);
        return false;
    }

    if (password.includes(' ')) {
        res.redirect(redirectDirectory);
        return false;
    }

    return true;
};

const validateUsername = (req, res, username) => {
    const redirectDirectory = req.headers.referer.substr(strToRemove.length);
    if (username === '' || username === null) {
        res.redirect(redirectDirectory);
        return false;
    }

    if (username.length < 3 || typeof username !== 'string') {
        res.redirect(redirectDirectory);
        return false;
    }

    if (username.match(/[^a-zA-Z0-9 ]/)) {
        res.redirect(redirectDirectory);
        return false;
    }

    if (username.includes(' ')) {
        res.redirect(redirectDirectory);
        return false;
    }
    return true;
};

const validateName = (req, res, name) => {
    const redirectDirectory = req.headers.referer.substr(strToRemove.length);

    if (name !== null || name !== '' || name !== 'undefined') {
        if (name.match(/[^a-zA-Z ]/)) {
            res.redirect(redirectDirectory);
            return false;
        }
    }
    return true;
};

const validatePasswordUpdate = (req, res, password, user) => {
    const redirectDirectory = `/users/${user.username}/updateProfil`;

    if (password !== null || password !== '' || password !== 'undefined') {
        if (password.length < 6) {
            res.redirect(redirectDirectory);
            return false;
        }

        if (password.includes(' ')) {
            res.redirect(redirectDirectory);
            return false;
        }
    }
    return true;
};

const validateTown = (req, res, town) => {
    const redirectDirectory = req.headers.referer.substr(strToRemove.length);

    if (town.length !== 0) {
        if (town.length < 2) {
            res.redirect(redirectDirectory);
            return false;
        }
        if (town.match(/[^a-zA-Z ]/)) {
            res.redirect(redirectDirectory);
            return false;
        }
    }
    return true;
};

const validateProfilImageUrl = (req, res, url) => {
    const redirectDirectory = req.headers.referer.substr(strToRemove.length);
    const urlRegex =/^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;

    if (url.length !== 0) {
        if (!url.match(urlRegex)) {
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
    validateProfilImageUrl,
};
