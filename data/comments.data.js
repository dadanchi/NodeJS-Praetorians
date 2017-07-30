const BaseData = require('./base/base.data');
const Comment = require('../models/comment.model');
const { ObjectID } = require('mongodb');
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
    findById(id) {
        return this.collection.findOne({
            _id: new ObjectID(id),
        });
    }

    _isModelValid(model) {
        // custom validation


        return super._isModelValid(model);
    }
}

module.exports = CommentsData;
