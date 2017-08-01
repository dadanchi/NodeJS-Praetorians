/* eslint linebreak-style: ["error", "windows"]*/
const { MongoClient } = require('mongodb');

const init = (connectionString) => {
    return MongoClient.connect(connectionString)
        .then((db) => {
            return db;
        });
};

module.exports = { init };
