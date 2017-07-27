class Comment {
    constructor(topicId, topic, authorId, author, content) {
        this._topicId = topicId;
        this._topic = topic;
        this._authorId = authorId;
        this._author = author;
        this._content = content;
    }

    get topicId() {
        return this._topicId;
    }
    get topic() {
        return this._topic;
    }
    get authorId() {
        return this._authorId;
    }

    get author() {
        return this._author;
    }

    get content() {
        return this._content;
    }

    get id() {
        return this._id;
    }

    static isValid(model) {
        return true;
        // return typeof model !== 'undefined' &&
        //     typeof model.text === 'string' &&
        //     model.text.length > 3;
    }

    static toViewModel(model) {
        const viewModel = new Comment();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Comment;
