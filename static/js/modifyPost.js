
$(() => {
    const modifyBtn = '.modify-btn';
    const deleteBtn = '.delete-btn';
    const returnBtn = '.return-btn';
    const confirmBtn = '.confirm-btn';
    const modifyForm = '.modify-form';

    const cell = document.querySelectorAll('.modify-conteiner');
    for (let i = 0; i < cell.length; i++) {
        cell[i].addEventListener('mousemove', callback, false);
    }
    function callback() {
        const $this = $(this);
        $this.find(modifyBtn).on('click', function() {
            $this.find(modifyBtn).css('display', 'none');
            $this.find(deleteBtn).css('display', 'none');
            $this.find(returnBtn).css('display', 'inline-block');
            $this.find(modifyForm).css('display', 'inline-block');
        });
        $this.find(confirmBtn).on('click', function() {
            $this.find(modifyBtn).css('display', 'inline-block');
            $this.find(deleteBtn).css('display', 'inline-block');
            $this.find(returnBtn).css('display', 'none');
            $this.find(modifyForm).css('display', 'none');
        });
        $this.find(returnBtn).on('click', function() {
            $this.find(modifyBtn).css('display', 'inline-block');
            $this.find(deleteBtn).css('display', 'inline-block');
            $this.find(returnBtn).css('display', 'none');
            $this.find(modifyForm).css('display', 'none');
        });
    }
});

