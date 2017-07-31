const { expect } = require('chai');

const { init } =
    require('../../../../../../app/routers/topics.router/controller');

describe('controller.edit', () => {
    let controller = null;
    const topic = {
        title: 'omg hi',
     };
    let res = null;
    let req = null;
    const comment = 'dsa';
    const data = {
        topics: {
            modify() {
                return Promise.resolve(topic);
            },
        },
        users: {
            updateComment() {
                return Promise.resolve(comment);
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
    it('expect to redirect to /topics/{}', () => {
        return controller.edit(req, res)
            .then(() => {
                expect(res.redirectUrl).to.be.deep.equal(
                    `/topics/${topic.title}`);
            });
    });
});
