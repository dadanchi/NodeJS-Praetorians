const { expect } = require('chai');
const sinon = require('sinon');

const CommentsData = require('../../../data/comments.data');

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

        data = new CommentsData(db, ModelClass, validator);

        it('expect to return the item', () => {
            const result = data.findById(_id);
            expect(result).to.deep.equal(item);
        });
    });
});
