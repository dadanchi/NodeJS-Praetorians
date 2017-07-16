/* eslint linebreak-style: ["error", "windows"]*/

const app = require('./app');

Promise.resolve(app.init())
    .then((a) => a.listen(3001));
