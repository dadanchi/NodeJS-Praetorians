const UsersData = require('./users.data');
const ItemsData = require('./items.data');

const init = (db) => {
    return Promise.resolve({
        // topics
        // comments
        users: new UsersData(db),
        items: new ItemsData(db),
    });
};

module.exports = { init };
