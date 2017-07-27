$(() => {
    const location = window.location.href.split('page=');
    let page = parseInt(location[1], 10);
    const scripts = document.getElementsByTagName('script');
    const lastScript = scripts[scripts.length-1];
    const itemsCount = lastScript.getAttribute('pages');
    const maxCount = 8;
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
// a little bug: it will work if the itemsCount is 8 and it's on the last page
        if (+itemsCount === maxCount) {
            $('#next-page-btn').on('click', () => {
                newLocation = newLocation.replace(
                    `page=${page}`,
                    `page=${page + 1}`);
                window.location.assign(newLocation);
            });
        }
    }
});
