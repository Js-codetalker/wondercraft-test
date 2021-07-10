//Modal
let openModalButton = document.querySelector('.products__modalButton'),
	closeModalButton = document.querySelector('.modal__head-closeButton'),
	proceedButton = document.querySelector('.modal__proceedButton'),
	cancelButton = document.querySelector('.modal__cancelButton'),
	modal = document.querySelector('.modalOverlay');

function openModal() {
	modal.classList.remove('toggle');
}
function closeModal() {
	modal.classList.add('toggle')
}

proceedButton.addEventListener('click',()=> {
	closeModal();
})
openModalButton.addEventListener('click',()=> {
	openModal();
})
closeModalButton.addEventListener('click',()=> {
	closeModal();
})
cancelButton.addEventListener('click',()=> {
	closeModal();
})
modal.addEventListener('click',()=> {
	closeModal();
})