$(function () {
    const btn = $('#show-posts-btn');
    const postUl = $('#posts-container');
    btn.on('click', () => {
        postUl.children().css('display', 'block');
    });
});
