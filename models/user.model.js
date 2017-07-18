class User {
    constructor(username, password, firstName, lastName, town) {
        this._username = username;
        this._password = password;
        this._firstName = firstName;
        this._lastName = lastName;
        this._town = town;
    }

    get username() {
        return this._username;
    }

    get password() {
        return this._password;
    }

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }

    get town() {
        return this._town;
    }

    get id() {
        return this._id;
    }

    static isValid(model) {
        return true;
    }

    static toViewModel(model) {
        const viewModel = new User();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

            return viewModel;
    }
}

module.exports = User;
