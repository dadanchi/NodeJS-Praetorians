/* globals $ */

$(() => {
    const showBtn = $('#posts-show-btn');
    const hideBtn = $('#posts-hide-btn');
    const postUl = $('#posts-container');

    showBtn.on('click', () => {
        postUl.children().css('display', 'block');
        showBtn.css('display', 'none');
        hideBtn.css('display', 'block');
    });

    hideBtn.on('click', () => {
        postUl.children('#user-posts-wrapper').css('display', 'none');
        showBtn.css('display', 'block');
        hideBtn.css('display', 'none');
    });
});
