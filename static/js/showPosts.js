$(function() {
    console.log('here');
    const el = $('user-posts-wrapper');
    const btn = $('show-posts-btn');
     btn.on('click', () => {
        el.css('display', 'inline');
    });
});

