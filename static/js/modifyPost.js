
$(() => {
    const cell = document.querySelectorAll('.form-modify');
    for (let i = 0; i < cell.length; i++) {
        cell[i].addEventListener('click', callback, false);
    }
    function callback() {
        const $this = $(this);
        $this.children('.modify-btn').on('click', function() {
            $this.children('.modify-btn').css('display', 'none');
            $this.children('.confirm-btn').css('display', 'block');
            $this.children('.modify-text').css('display', 'block');
        });
        $this.children('.confirm-btn').on('click', function() {
            $this.children('.modify-btn').css('display', 'block');
            $this.children('.confirm-btn').css('display', 'none');
            $this.children('.modify-text').css('display', 'none');
        });
    }
});

