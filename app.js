//JSON 
const request = new XMLHttpRequest;
request.open('GET','https://api.jsonbin.io/b/5e1aa891b236b871b3605dd6/1');
request.send();

request.addEventListener("load",()=>{
	if (request.status == 200) {
		let recivedData = JSON.parse(request.response);
		var orderedData = [];

		for (let i = 0; i < recivedData['data'].length; i++) {
			if (recivedData['data'][i]['id'] && recivedData['data'][i]['name'] && recivedData['data'][i]['image'] && recivedData['data'][i]['price']) {
				orderedData[i] = recivedData['data'][i]
			} else {
				console.log('Unvalid data recived');
			}
		}

		orderedData.sort((a,b)=>{
			if (a.name < b.name) {
				return -1;
			}
			if (a.name > b.name) {
				return 1;
			}
			return 0;
		});

		var documentFragment = document.createDocumentFragment();
		var productsGrid = document.querySelector('.products__grid')

		for (let i = 0; i < orderedData.length; i++) {
			let productItem = document.createElement('DIV');
			productItem.classList.add('products__grid-item');
			productItem.setAttribute('id',orderedData[i]['id'])

			let productItemImg = document.createElement('IMG');
			productItemImg.classList.add('products__grid-item-img');
			productItemImg.setAttribute('src',orderedData[i]['image']);
			productItem.appendChild(productItemImg);

			let productItemDescription = document.createElement('P');
			productItemDescription.innerHTML = orderedData[i]['name'];
			productItemDescription.classList.add('products__grid-item-description');
			productItem.appendChild(productItemDescription);

			let productItemPrice = document.createElement('P');
			productItemPrice.innerHTML ="$ "+(orderedData[i]['price']/100);
			productItemPrice.classList.add('products__grid-item-price');
			productItem.appendChild(productItemPrice);

			if (orderedData[i]['best_seller']) {
				let bestSeller = document.createElement('DIV');
				bestSeller.classList.add('bestseller');

				let bestSellerText = document.createElement('P');
				bestSeller.classList.add('bestseller__content');
				bestSellerText.textContent = "BEST SELLER"
				bestSeller.appendChild(bestSellerText);
				productItem.appendChild(bestSeller);
			}
			documentFragment.appendChild(productItem);

			if (i == (orderedData.length-1)) {
				productsGrid.appendChild(documentFragment)
			}
		}
	}
})
//Modal
let openModalButton = document.querySelector('.products__modalButton'),
	closeModalButton = document.querySelector('.modal__head-closeButton'),
	proceedButton = document.querySelector('.modal__proceedButton'),
	cancelButton = document.querySelector('.modal__cancelButton'),
	modal = document.querySelector('.modal')
	modalOverlay = document.querySelector('.modalOverlay');

function openModal() {
	modalOverlay.classList.remove('toggle');
	modal.classList.add('active');
};
function closeModal() {
	modalOverlay.classList.add('toggle');
	modal.classList.remove('active');
};

proceedButton.addEventListener('click',()=> {
	closeModal();
});
openModalButton.addEventListener('click',()=> {
	openModal();
});
closeModalButton.addEventListener('click',()=> {
	closeModal();
});
cancelButton.addEventListener('click',()=> {
	closeModal();
});
modalOverlay.addEventListener('click',(ev)=> {
	closeModal();
	ev.stopPropagation();
},true);