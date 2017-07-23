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

    async addComment(comment) {
        const newTopic = await this.collection.findOne(
            {
                title: comment.topic,
        });
        const newComment = {
            content: comment.content,
            author: comment.author,
        };

        newTopic.comments.push(newComment);

        return this.collection.updateOne(
            {
                title: comment.topic,
            },
                newTopic
            )
            .then(() => {
                return newComment;
            });
    }

    findByTitle(title) {
        return this
            .filterBy({ title: new RegExp(title, 'i') })
            .then(([topic]) => topic);
    }
}

module.exports = TopicsData;
