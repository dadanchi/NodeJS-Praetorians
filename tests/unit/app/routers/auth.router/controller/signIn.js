const { expect } = require('chai');

const { init } =
    require('../../../../../../app/routers/auth.router/controller');

describe('controller.signIn', () => {
    let controller = null;
    let res = null;
    let req = null;

    const data = {
    };

    const options = {
        body: {
            firstname: 'gosho',
            lastname: 'goshov',
            town: 'Dubai',
            password: 'omega',
        },
    };

    controller = init(data);

    res = require('../../../../req-res').getResponseMock();
    req = require('../../../../req-res').getRequestMock(options);
    it('expect to redirect to home', () => {
        Promise.resolve(controller.signIn(req, res))
            .then(() => {
                expect(res.redirectUrl).to.be.deep.equal('/');
            });
    });
});
