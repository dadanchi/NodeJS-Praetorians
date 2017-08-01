const request = require('supertest');
const { init } = require('../../app/');
describe('/topics tests', () => {
    const connectionString = 'mongodb://localhost/forum-db-test';
    let app = null;

    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../db').init(connectionString))
            .then((db) => require('../../data').init(db))
            .then((data) => require('../../app').init(data))
            .then((_app) => {
                app = _app;
            });
    });
    describe('GET /topics', () => {

        it('expect to return 200', (done) => {
            request(app)
                .get('/topics')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
    describe('PSOT /topics', () => {

        it('expect to return 200', (done) => {
            request(app)
                .get('/topics')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
    describe('GET /topics/form', () => {

        it('expect to return 302', (done) => {
            request(app)
                .get('/topics/form')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
     describe('GET /topics/filtered', () => {
          const controller = {
            searchTopic() {
                return done();
                },
          }
        it('expect to return 200', (done) => {
            request(app)
                .get('/topics/filtered')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
});