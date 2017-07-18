const UsersData = require('./users.data');

const init = (db) => {
    return Promise.resolve({
        // topics
        // comments
        users: new UsersData(db),
    });
};

module.exports = { init };
