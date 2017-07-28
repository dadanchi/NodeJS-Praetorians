
$(() => {
    const cell = document.querySelectorAll('.modify-conteiner');
    for (let i = 0; i < cell.length; i++) {
        cell[i].addEventListener('click', callback, false);
    }
    function callback() {
        const $this = $(this);
        $this.find('.modify-btn').on('click', function() {
            $this.find('.modify-btn').css('display', 'none');
            $this.find('.modify-form').css('display', 'block');
        });
        $this.find('.confirm-btn').on('click', function() {
            $this.find('.modify-btn').css('display', 'block');
            $this.find('.modify-form').css('display', 'none');
        });
    }
});

