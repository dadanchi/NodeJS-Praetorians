const { expect } = require('chai');
const sinon = require('sinon');
const strToRemove = 'http://localhost:3001';
const mockReq = require('mock-req');

const req = new mockReq({
    headers: {
        referer: 'http://localhost:3001/auth/sign-up',
    },
});
const res = require('../req-res').getResponseMock();
const validator = require('../../../helpers/validator');

describe('Validator validatePassword', () => {
    describe('When password shorter than 6 chars has been provided', () => {
        const passwordToChek = '12';

        it('expect to return false.', () => {
            const result = validator.validatePassword(req, res, passwordToChek);
            expect(result).to.deep.equal(false);
        });
    });

    describe('When password does not contain allowed symbols', () => {
        const passwordToChek = '!@';

        it('expect to return false.', () => {
            const result = validator.validatePassword(req, res, passwordToChek);
            expect(result).to.deep.equal(false);
        });
    });

    describe('When password contains white spaces', () => {
        const passwordToChek = 'qka parola';

        it('expect to return false.', () => {
            const result = validator.validatePassword(req, res, passwordToChek);
            expect(result).to.deep.equal(false);
        });
    });

    describe('When password is null or empty', () => {
        const passwordToChek = '';

        it('expect to return false.', () => {
            const result = validator.validatePassword(req, res, passwordToChek);
            expect(result).to.deep.equal(false);
        });
    });
});

describe('Validator validateUsername', () => {
    describe('when username is null or empty', () => {
        const usernameToCheck = '';

        it('expect to return false.', () => {
            const result =
                        validator.validateUsername(req, res, usernameToCheck);
            expect(result).to.deep.equal(false);
        });
    });

    describe('when username is shorter than 3 symbols', () => {
        const usernameToCheck = 'un';

        it('expect to return false.', () => {
            const result =
            validator.validateUsername(req, res, usernameToCheck);
            expect(result).to.deep.equal(false);
        });
    });

    describe('when username is not a string', () => {
        const usernameToCheck = 14525;

        it('expect to return false.', () => {
            const result =
                validator.validateUsername(req, res, usernameToCheck);
            expect(result).to.deep.equal(false);
        });
    });

    describe('when username contains forbidden symbols', () => {
        const usernameToCheck = '%$#@#$';

        it('expect to return false.', () => {
            const result =
                    validator.validateUsername(req, res, usernameToCheck);
            expect(result).to.deep.equal(false);
        });
    });

    describe('when username contains whitespaces', () => {
        const usernameToCheck = 'joro gosho';

        it('expect to return false.', () => {
            const result = validator.
                                validateUsername(req, res, usernameToCheck);
            expect(result).to.deep.equal(false);
        });
    });
});

describe('Validator validateName', () => {
    describe('when name contains forbidden symbols', () => {
        const nameToCheck = '#$%^&';

        it('expect to return false.', () => {
            const result = validator.validateName(req, res, nameToCheck);
            expect(result).to.deep.equal(false);
        });
    });
});

describe('Validator validateTown', () => {
    describe('when town name is shorter than 2 symbols', () => {
        const townCheck = 't';

        it('expect to return false.', () => {
            const result = validator.validateTown(req, res, townCheck);
            expect(result).to.deep.equal(false);
        });
    });

    describe('when town name contains forbidden symbols', () => {
        const townCheck = '#$%^&';

        it('expect to return false.', () => {
            const result = validator.validateTown(req, res, townCheck);
            expect(result).to.deep.equal(false);
        });
    });
});

describe('Validator validateUrl', () => {
    describe('when url is not valid', () => {
        const urlCheck = 'fg65er';

        it('expect to return false.', () => {
            const result = validator.validateProfilImageUrl(req, res, urlCheck);
            expect(result).to.deep.equal(false);
        });
    });
});
