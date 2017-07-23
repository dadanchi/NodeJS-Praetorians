const UsersData = require('./users.data');
const TopicsData = require('./topics.data');

const init = (db) => {
    return Promise.resolve({
        // topics
        // comments
        users: new UsersData(db),
        topics: new TopicsData(db),
    });
};

module.exports = { init };
