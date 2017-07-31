const { expect } = require('chai');

const { init } =
    require('../../../../../../app/routers/topics.router/controller');

describe('controller.delete', () => {
    let controller = null;
    const topic = {
        title: 'omg hi',
     };
    let res = null;
    let req = null;
    const data = {
        topics: {
            deleteComment() {
                return Promise.resolve(topic);
            },
        },
    };

    const options = {
        body: {
            content: 'omg content',
        },
        params: {
            commentId: 1,
            title: topic.title,
        },
    };

    controller = init(data);

    res = require('../../../../req-res').getResponseMock();
    req = require('../../../../req-res').getRequestMock(options);
    it('expect to redirect to /topics/{title}', () => {
        return controller.delete(req, res)
            .then(() => {
                expect(res.redirectUrl).to.be.deep.equal(
                    `/topics/${topic.title}`);
            });
    });
});
