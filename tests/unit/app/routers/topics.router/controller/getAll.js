const { expect } = require('chai');

const { init } =
    require('../../../../../../app/routers/topics.router/controller');

describe('when page is last page', () => {
    let controller = null;
    const topics = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let res = null;
    let req = null;
    const expectedTopicsCount = 8;

    const data = {
        topics: {
            getAllTopics() {
                return Promise.resolve(topics);
            },
            updateProfil() {
                return Promise.resolve(topics);
            },
        },
    };

    const options = {
        query: {
            page: 2,
        },
    };

    controller = init(data);

    res = require('../../../../req-res').getResponseMock();
    req = require('../../../../req-res').getRequestMock(options);
    it('expect getAll to return the last remaining topics', () => {
        return controller.getAll(req, res)
            .then(() => {
                expect(res.context.context.length).to.be.deep.equal(
                    topics.length - expectedTopicsCount);
            });
    });
});

describe('when page is last page', () => {
    let controller = null;
    const topics = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let res = null;
    let req = null;
    const expectedTopicsCount = 8;

    const data = {
        topics: {
            getAllTopics() {
                return Promise.resolve(topics);
            },
            updateProfil() {
                return Promise.resolve(topics);
            },
        },
    };
    const options = {
        query: {
            page: 1,
        },
    };

    controller = init(data);

    res = require('../../../../req-res').getResponseMock();
    req = require('../../../../req-res').getRequestMock(options);
    it('expect getAll to return exatly 8 pages', () => {
        return controller.getAll(req, res)
            .then(() => {
                expect(res.context.context.length).to.be.deep.equal(
                    expectedTopicsCount);
            });
    });
});

describe('when page is last page', () => {
    let controller = null;
    const topics = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let res = null;
    let req = null;

    const data = {
        topics: {
            getAllTopics() {
                return Promise.resolve(topics);
            },
            updateProfil() {
                return Promise.resolve(topics);
            },
        },
    };
    const options = {
        query: {
            page: 1,
        },
    };

    controller = init(data);

    res = require('../../../../req-res').getResponseMock();
    req = require('../../../../req-res').getRequestMock(options);

    it('expect getAll to redirect to topics/all', () => {
        return controller.getAll(req, res)
            .then(() => {
                expect(res.viewName).to.be.equal('topics/all');
            });
    });
});
