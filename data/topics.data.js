const BaseData = require('./base/base.data');
const Topic = require('../models/topic.model');
const helper = require('../helpers/helpers');

class TopicsData extends BaseData {
    constructor(db) {
        super(db, Topic, Topic);
    }

    _isModelValid(model) {
        // custom validation

        return super._isModelValid(model);
    }
    getAllTopics() {
        return this.collection
            .find()
            .toArray()
            .then((x) => {
                return x.reverse();
            });
    }

    async addComment(comment) {
        const newTopic = await this.collection.findOne(
            {
                title: comment.topic,
            });

        const newComment = {
            topic: comment.topic,
            content: comment.content,
            author: comment.author,
            authorId: comment.authorId,
            date: comment.date,
            _id: comment._id,
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
    findBy(input) {
        return this.collection.find(
            {
                title: { $regex: `${input}` },
            })
            .toArray();
    }
    findByTitle(title) {
        return this
            .filterBy({ title: new RegExp(title, 'i') })
            .then(([topic]) => topic);
    }
}

module.exports = TopicsData;
