const { expect } = require('chai');
const MockReq = require('mock-req');

const { init } =
    require('../../../../../../app/routers/users.router/controller');

describe('users controller', () => {
    let data = null;
    let controller = null;
    const user = [1, 2, 3, 4];

    let res = null;
    let req = null;

    beforeEach(() => {
        data = {
            users: {
                findByUserName() {
                    return Promise.resolve(user);
                },
            },
        };
        const params = {
            params: {
                user: {
                    username: 'gosho',
                },
            },
        };
        controller = init(data);
        res = require('../../../../req-res').getResponseMock();
        req = require('../../../../req-res').getRequestMock(params);
    });

    it('expect showUserProfile to return user', () => {
        return controller.showUserProfile(req, res)
            .then(() => {
                expect(res.context).to.be.deep.equal({
                    context: user,
                });
                expect(res.viewName).to.be.equal('users/profiles');
            });
    });
});
