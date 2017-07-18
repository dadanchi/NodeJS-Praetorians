/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console */

const async = () => {
    return Promise.resolve();
};

const config = require('./config');

async()
    .then(() => require('./db').init(config.connectionString))
    .then((app) => require('./app').init())
    .then((app) => {
        app.listen(config.port, () => console.log('Tva e server'));
    });
