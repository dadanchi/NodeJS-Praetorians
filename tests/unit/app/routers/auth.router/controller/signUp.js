const { expect } = require('chai');

const { init } =
    require('../../../../../../app/routers/auth.router/controller');

describe('controller.signUp', () => {
    let controller = null;
    let res = null;
    let req = null;
    const user = {
        firstname: 'gosho',
        lastname: 'goshov',
        town: 'Dubai',
        password: 'omega',
    };

    const data = {
        users: {
            findByUserName() {
                return Promise.resolve(user);
            },
            create() {
                return user;
            },
        },
    };

    const options = {
        body: {
            username: 'testov',
            firstname: 'gosho',
            lastname: 'goshov',
            town: 'Dubai',
            password: 'omegaaaa',
            profilImage: 'https://www.smashingmagazine.com/wp-content/uploads/2015/06/10-dithering-opt.jpg',
        },
        headers: {
            referer: '/',
        },
    };

    controller = init(data);

    res = require('../../../../req-res').getResponseMock();
    req = require('../../../../req-res').getRequestMock(options);
    it('expect to redirect to home', () => {
        Promise.resolve(controller.signUp(req, res))
            .then(() => {
                expect(res.redirectUrl).to.be.deep.equal('/');
            });
    });
});
