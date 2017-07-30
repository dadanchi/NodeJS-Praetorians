const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../../data/base/base.data');

describe('Base data getAll()', () => {
    describe('When there items in db', () => {
        const db = {
            collection: () => {},
        };

        let items = [];
        let ModelClass = null;
        const validator = null;
        let data = null;

        const toArray = () => {
            return Promise.resolve(items);
        };

        const find = () => {
            return {
                toArray,
            };
        };

        beforeEach(() => {
            items = ['test'];
            sinon.stub(db, 'collection')
                .callsFake(() => {
                    return { find };
                });

            ModelClass = class {
            };

            data = new BaseData(db, ModelClass, validator);
        });

        it('expect to return items', () => {
           return data.getAll()
                    .then((models) => {
                        expect(models).to.deep.equal(items);
                });
        });
    });
});
