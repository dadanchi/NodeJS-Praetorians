const getDate = () => {
    const date = new Date();
    return date.getHours() + 'hrs ' + date.getMinutes() + 'mins '
                                        + date.getDate() + ' '
                                       + date.getMonth() + ' '
                                       + date.getFullYear();
};

module.exports = { getDate };
