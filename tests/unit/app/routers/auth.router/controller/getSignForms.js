const { expect } = require('chai');

const { init } =
    require('../../../../../../app/routers/auth.router/controller');

describe('controller.getSignUpForm', () => {
    let controller = null;
    let res = null;
    let req = null;

    const data = {
    };

    controller = init(data);

    res = require('../../../../req-res').getResponseMock();
    req = require('../../../../req-res').getRequestMock();
    it('expect to render the sing-up form', () => {
        Promise.resolve(controller.getSignUpForm(req, res))
            .then(() => {
                expect(res.viewName).to.be.deep.equal('auth/sign-up');
            });
    });
});

describe('controller.getSignInForm', () => {
    let controller = null;
    let res = null;
    let req = null;

    const data = {
    };

    controller = init(data);

    res = require('../../../../req-res').getResponseMock();
    req = require('../../../../req-res').getRequestMock();
    it('expect to render the sing-in form', () => {
        Promise.resolve(controller.getSignInForm(req, res))
            .then(() => {
                expect(res.viewName).to.be.deep.equal('auth/sign-in');
            });
    });
});
