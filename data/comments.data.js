const BaseData = require('./base/base.data');
const Comment = require('../models/comment.model');

class CommentsData extends BaseData {
    constructor(db) {
        super(db, Comment, Comment);
    }
    findBy(input) {
        return this.collection.find(
            {
                comment: { $regex: `${input}` },
            })
            .toArray();
    }
    // createComment(input) {
    //     const comment = {
    //         topic: input.topic,
    //         topicId: input.id,
    //         content: input.comment,
    //         author: input.username,
    //         authorId: input._id,
    //         date: input.date,
    //     };
    // }
    // update(input) {
    // }
    _isModelValid(model) {
        // custom validation


        return super._isModelValid(model);
    }
}

module.exports = CommentsData;
