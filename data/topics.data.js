const BaseData = require('./base/base.data');
const Topic = require('../models/topic.model');
const { ObjectID } = require('mongodb');

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
                return x.sort()
                    .reverse();
            });
    }

    modify(title, newContent, id) {
        return this.collection.update(
            { 'comments._id': new ObjectID(`${id}`) },
            {
                $set: {
                    'comments.$.content': newContent,
                },
            });
    }
    // deleteComment(title, id) {
    //     return this.collection.update(
    //         { 'title': `${title}` },
    //         {
    //             $pull: {
    //                 'comments': {
    //                     '_id': new ObjectID(`${id}`),
    //                 },
    //             },
    //         },
    //     );
    // }

    addComment(comment) {
        return Promise.resolve(this.collection.findOne(
            {
                title: comment.topic,
            })).then((newTopic) => {
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
            });
    }

    findBy(input) {
        return this.collection.find(
            {
                title: { $regex: `.*${input}.*` },
            })
            .toArray();
    }
    findByTitle(title) {
        return this
            .filterBy({ title: title })
            .then(([topic]) => topic);
    }
}

module.exports = TopicsData;
