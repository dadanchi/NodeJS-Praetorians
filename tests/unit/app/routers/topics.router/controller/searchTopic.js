const { expect } = require('chai');

const { init } =
    require('../../../../../../app/routers/topics.router/controller');

describe('When controller.SearchTopic is called', () => {
    let controller = null;
    const topics = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let res = null;
    let req = null;

    const data = {
        topics: {
            findBy() {
                return Promise.resolve(topics);
            },
        },
    };

    const options = {
        query: {
            searh: null,
        },
    };

    controller = init(data);

    res = require('../../../../req-res').getResponseMock();
    req = require('../../../../req-res').getRequestMock(options);
    it('expect searchTopic to return topics', () => {
        return controller.searchTopic(req, res)
            .then(() => {
                expect(res.context).to.be.deep.equal(
                    { topics: topics });
            });
    });
    it('expect to render topics/allFiltered', () => {
        return controller.searchTopic(req, res)
            .then(() => {
                expect(res.viewName).to.be.deep.equal('topics/allFiltered');
            });
    });
});
