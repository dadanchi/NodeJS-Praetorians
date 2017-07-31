const { expect } = require('chai');

const { init } =
    require('../../../../../../app/routers/topics.router/controller');

describe('controller.addComment', () => {
    let controller = null;
    const topic = {
        _id: 2,
        title: 'evalarka',
    };
    let res = null;
    let req = null;
    const comment = 'dsa';
    const data = {
        topics: {
            findByTitle() {
                return Promise.resolve(topic);
            },
            addComment() {

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
            params: {
                title: 'gosho',
            },
            body: {
                comment: comment,
            },
            user: {
                username: 'pesho',
                _id: 1,
            },
    };

    controller = init(data);

    res = require('../../../../req-res').getResponseMock();
    req = require('../../../../req-res').getRequestMock(options);
    it('expect to redirect to /topics', () => {
        return controller.addComment(req, res)
            .then(() => {
                expect(res.redirectUrl).to.be.deep.equal(
                    `/topics/${options.params.title}`);
            });
    });
});
