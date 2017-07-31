const UsersData = require('./users.data');
const TopicsData = require('./topics.data');
const CommentsData = require('./comments.data');

const init = (db) => {
    return Promise.resolve({
        users: new UsersData(db),
        topics: new TopicsData(db),
        comments: new CommentsData(db),
    });
};

module.exports = { init };
