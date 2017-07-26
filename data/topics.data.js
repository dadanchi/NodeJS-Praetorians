const BaseData = require('./base/base.data');
const Topic = require('../models/topic.model');
const date = new Date();

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
            .limit(10)
            .toArray();
    }
    // getPages(nPerPage, pageNumber) {
    //     return this.collection.find()
    //         .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
    //         .limit(nPerPage)
    //         .toArray();
    // }

    async addComment(comment) {
        const newTopic = await this.collection.findOne(
            {
                title: comment.topic,
            });
        const newComment = {
            content: comment.content,
            author: comment.author,
            date: date.getHours() + 'hrs ' + date.getMinutes() + 'mins '
                                        + date.getDate() + ' '
                                       + date.getMonth() + ' '
                                       + date.getFullYear(),
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
