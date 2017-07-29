
$(() => {
    const modifyBtn = '.modify-btn';
    const confirmBtn = '.confirm-btn';
    const modifyForm = '.modify-form';
    const cell = document.querySelectorAll('.modify-conteiner');
    for (let i = 0; i < cell.length; i++) {
        cell[i].addEventListener('mouseover', callback, false);
    }
    function callback() {
        const $this = $(this);
        $this.find(modifyBtn).on('click', function() {
            $this.find(modifyBtn).css('display', 'none');
            $this.find(modifyForm).css('display', 'block');
        });
        $this.find(confirmBtn).on('click', function() {
            $this.find(modifyBtn).css('display', 'block');
            $this.find(modifyForm).css('display', 'none');
        });
    }
});

