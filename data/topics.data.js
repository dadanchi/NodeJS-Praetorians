const BaseData = require('./base/base.data');
const Topic = require('../models/topic.model');

class TopicsData extends BaseData {
    constructor(db) {
        super(db, Topic, Topic);
    }

    _isModelValid(model) {
        // custom validation
        return super._isModelValid(model);
    }

    findByTitle(title) {
        return this
            .filterBy({ title: new RegExp(title, 'i') })
            .then(([topic]) => topic);
    }
}

module.exports = TopicsData;
