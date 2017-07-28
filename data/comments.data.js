/* eslint quotes: ["error", "double", { "allowTemplateLiterals": true }]*/
const BaseData = require("./base/base.data");
const Comment = require("../models/comment.model");
const { ObjectID } = require("mongodb");
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
    modify(id, newContent) {
        return this.collection.findOne({
            _id: new ObjectID(id),
        })
            .then((comment) => {
                // comment.content = newContent;
                // console.log(comment);
                return this.collection.updateOne(
                    { "topic": `${comment.topic}` },
                    { "author": `${comment.author}` },
                    { "authorId": `${comment.authorId}` },
                    { "date": `${comment.date}` },
                    { "_id": `${comment._id}` },
                    {
                        $set: {
                            "content": `${newContent}`,
                        },
                    }
                );
            });
    }

    _isModelValid(model) {
        // custom validation


        return super._isModelValid(model);
    }
}

module.exports = CommentsData;
