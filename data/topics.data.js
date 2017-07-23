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

    async addComment(comment, title) {
        const newTopic = await this.collection.findOne(
            {
                title: title,
            });
        newTopic.comments.push(comment);

        return this.collection.updateOne(
            {
                title: title,
            },
                newTopic
            )
            .then(() => {
                return comment;
            });
    }

    findByTitle(title) {
        return this
            .filterBy({ title: new RegExp(title, 'i') })
            .then(([topic]) => topic);
    }
}

module.exports = TopicsData;
