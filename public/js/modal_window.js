document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.modal_window').forEach(modal => {
        const ellipsisBtn = modal.querySelector('.ellipsis');
        const modalContent = modal.querySelector('.modal_content');

        ellipsisBtn.addEventListener('click', () => {
            modalContent.classList.toggle('active');
        });
    });
});