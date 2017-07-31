const { expect } = require('chai');

const { init } =
    require('../../../../../../app/routers/auth.router/controller');

describe('controller.signOut', () => {
    let controller = null;
    let res = null;
    let req = null;

    const data = {
    };

    const options = {
        logout() {
            return 1;
        },
    };

    controller = init(data);

    res = require('../../../../req-res').getResponseMock();
    req = require('../../../../req-res').getRequestMock(options);
    it('expect to redirect to home', () => {
        Promise.resolve(controller.signOut(req, res))
            .then(() => {
                expect(res.redirectUrl).to.be.deep.equal('/');
            });
    });
});
