$(() => {
    const location = window.location.href.split('page=');
    let page = parseInt(location[1], 10);

    if (isNaN(page)) {
        page = 1;
        $('#next-page-btn').on('click', () => {
        window.location.assign(window.location.href + '?page=2');
        });
    } else {
        let newLocation = window.location.href;
        if (page !== 1) {
            $('#prev-page-btn').on('click', () => {
                newLocation = newLocation.replace(
                    `page=${page}`,
                    `page=${page-1}`);
                window.location.assign(newLocation);
            });
        }
        $('#next-page-btn').on('click', () => {
            newLocation = newLocation.replace(
                `page=${page}`,
                `page=${page + 1}`);
            window.location.assign(newLocation);
        });
    }
});
