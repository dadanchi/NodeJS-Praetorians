const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../../data/base/base.data');

describe('Base data getAll()', () => {
    describe('When there items in db', () => {
        const db = {
            collection: () => { },
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

        items = ['test'];
        sinon.stub(db, 'collection')
            .callsFake(() => {
                return { find };
            });

        ModelClass = class {
        };

        data = new BaseData(db, ModelClass, validator);

        it('expect to return items', () => {
            return data.getAll()
                .then((models) => {
                    expect(models).to.deep.equal(items);
                });
        });
    });
});

describe('Base data findById(id)', () => {
    describe('When there is an item with passed id', () => {
        const db = {
            collection: () => { },
        };

        const _id = 1;

        const item = {
            id: _id,
            name: 'test',
        };
        let ModelClass = null;
        const validator = null;
        let data = null;


        const findOne = (id) => {
            return item;
        };

        sinon.stub(db, 'collection')
            .callsFake((id) => {
                return { findOne };
            });

        ModelClass = class {
        };

        data = new BaseData(db, ModelClass, validator);

        it('expect to return the item', () => {
            const result = data.findById(_id);
            expect(result).to.deep.equal(item);
        });
    });
});

describe('Base data _getCollectionName()', () => {
    describe('When there is a collection', () => {
        const db = {
            collection: () => { },
        };

        let ModelClass = null;
        const validator = null;
        let data = null;

        const expectedResult = 'tests';

        ModelClass = class {
            constructor(name) {
                this._name = name;
            }

            get name() {
                return this._name;
            }
        };

        const modelClassStub = new ModelClass('test');

        data = new BaseData(db, modelClassStub, validator);

        it('expect to return the collection with the required name', () => {
            const result = data._getCollectionName();
            expect(result).to.deep.equal(expectedResult);
        });
    });
});
