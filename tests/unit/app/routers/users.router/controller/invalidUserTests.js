const { expect } = require('chai');

const { init } =
    require('../../../../../../app/routers/users.router/controller');

describe('When user is not found', () => {
    let data = null;
    let controller = null;
    let options = null;

    let res = null;
    let req = null;
        data = {
            users: {
                findByUserName() {
                    return Promise.resolve();
                },
            },
        };

        options = {
            params: {
                user: null,
            },
        };


        controller = init(data);
        res = require('../../../../req-res').getResponseMock();
        req = require('../../../../req-res').getRequestMock(options);

        it('expect showUserProfile to redirect to error page',
            () => {
                return controller.showUserProfile(req, res)
                    .then((usr) => {
                        expect(res.viewName).to.be.equal('error');
                    });
        });

        it('expect getUpdateProfilPage to redirect to error page',
            () => {
                return controller.getUpdateProfilPage(req, res)
                    .then((usr) => {
                        expect(res.viewName).to.be.equal('error');
                    });
        });

        it('expect updateProfilInfo to redirect to error page', () => {
            return controller.updateProfilInfo(req, res)
                .then(() => {
                    expect(res.viewName).to.be.equal('error');
                });
        });
});
