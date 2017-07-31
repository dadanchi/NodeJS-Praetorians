const { expect } = require('chai');

const { init } =
    require('../../../../../../app/routers/topics.router/controller');

describe('redirect to /topics after topic is added', () => {
    let controller = null;
    const topic = { 1: 1 };
    let res = null;
    let req = null;
    const comment = 'dsa';
    const data = {
        topics: {
            create() {
                return Promise.resolve(topic);
            },
        },
        comments: {
            create() {
                return Promise.resolve(comment);
            },
        },
        users: {
            addComment() {
                return Promise.resolve(comment);
            },
        },
    };

    const options = {
        body: {
            topic: {
                title: 'dsa',
                content: 'dsa',
            },
        },
        user: {
            username: 'gosho',
            _id: 1,
        },
    };

    controller = init(data);

    res = require('../../../../req-res').getResponseMock();
    req = require('../../../../req-res').getRequestMock(options);
    it('expect addTopic to redirect to /topics', () => {
        return controller.addTopic(req, res)
            .then(() => {
                expect(res.redirectUrl).to.be.deep.equal('/topics');
            });
    });
});
