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
    // update(input) {
    // }
    _isModelValid(model) {
        // custom validation


        return super._isModelValid(model);
    }
}

module.exports = CommentsData;
