const getDate = () => {
    const date = new Date();
    return date.getHours() + 3 + ':' + date.getUTCMinutes() + '  '
        + date.getDate() + '.'
        + date.getMonth() + ' ' + date.getFullYear();
};

const encryptor =
    {
        encrypt: (password) => {
            let encryptedPassword = '';
            for (let i = 0; i < password.length; i += 1) {
                encryptedPassword += String.fromCharCode(
                    password.charCodeAt(i) + 14) + String.fromCharCode(
                        password.charCodeAt(i) + 3);
            }

            return encryptedPassword;
        },
    };

module.exports = {
    getDate,
    encryptor,
};

