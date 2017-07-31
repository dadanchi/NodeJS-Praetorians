const { expect } = require('chai');

const { init } =
    require('../../../../../../app/routers/topics.router/controller');

describe('controller.getCurrentTopic', () => {
    let controller = null;
    const topic = {
        comments: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
    let res = null;
    let req = null;

    const data = {
        topics: {
            findByTitle() {
                return Promise.resolve(topic);
            },
        },
    };

    const options = {
        query: {
            page: 1,
        },
        params: {
            title: 'gosho',
        },
    };

    controller = init(data);

    res = require('../../../../req-res').getResponseMock();
    req = require('../../../../req-res').getRequestMock(options);
    it('expect to return 8 comments and render topics/comments', () => {
        return controller.getCurrentTopic(req, res)
            .then(() => {
                expect(res.context.topic).to.be.deep.equal(
                    { comments: topic.comments }
                );
                expect(res.context.topic.comments.length).to.be.deep.equal(8);
                expect(res.viewName).to.be.deep.equal('topics/comments');
            });
    });
});

describe('controller.getCurrentTopic', () => {
    let controller = null;
    const topic = {
        comments: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
    let res = null;
    let req = null;

    const data = {
        topics: {
            findByTitle() {
                return Promise.resolve(topic);
            },
        },
    };

    const options = {
        query: {
            page: 2,
        },
        params: {
            title: 'gosho',
        },
    };

    controller = init(data);

    res = require('../../../../req-res').getResponseMock();
    req = require('../../../../req-res').getRequestMock(options);
    it('expect to return the last remaining comments and render topics/comments'
        , () => {
        return controller.getCurrentTopic(req, res)
            .then(() => {
                expect(res.context.topic.comments.length).to.be.deep.equal(
                    topic.comments.length);
                expect(res.viewName).to.be.deep.equal('topics/comments');
            });
    });
});
