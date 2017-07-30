const { expect } = require('chai');
const sinon = require('sinon');


const TopicsData = require('../../../data/topics.data');

describe('Base data getAllTopics()', () => {
    describe('When there topics in db', () => {
        const db = {
            collection: () => { },
        };

        let topics = [];
        let ModelClass = null;
        const validator = null;
        let data = null;

        const toArray = () => {
            return Promise.resolve(topics);
        };

        const find = () => {
            return {
                toArray,
            };
        };

        topics = ['test'];
        sinon.stub(db, 'collection')
            .callsFake(() => {
                return { find };
            });

        ModelClass = class {
        };

        data = new TopicsData(db, ModelClass, validator);

        it('expect to return topics', () => {
            return data.getAllTopics()
                .then((models) => {
                    expect(models).to.deep.equal(topics);
                });
        });
    });
});

