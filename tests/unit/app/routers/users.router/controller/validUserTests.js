const { expect } = require('chai');

const { init } =
    require('../../../../../../app/routers/users.router/controller');

describe('When user is found', () => {
    let data = null;
    let controller = null;
    const user = { username: 'Gosho' };
    let options = null;

    let res = null;
    let req = null;

    beforeEach(() => {
        data = {
            users: {
                findByUserName() {
                    return Promise.resolve(user);
                },
                updateProfil() {
                    return Promise.resolve(user);
                },
            },
        };

        options = {
            params: {
                user: {
                    username: 'gosho',
                },
            },
        };

        controller = init(data);

        res = require('../../../../req-res').getResponseMock();
        req = require('../../../../req-res').getRequestMock(options);
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

    it('expect getUpdateProfilPage to return user', () => {
        return controller.getUpdateProfilPage(req, res)
            .then(() => {
                expect(res.context).to.be.deep.equal({
                    context: user,
                });
                expect(res.viewName).to.be.equal('users/updateProfil');
            });
    });

    it('expect updateProfilInfo to update user and redirect to home', () => {
        return controller.updateProfilInfo(req, res)
            .then(() => {
                expect(res.viewName).to.be.equal('home');
            });
    });
});
