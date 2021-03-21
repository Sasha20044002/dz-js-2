const goodsList = document.querySelector('.goods-list');

class BinItem {
	constructor(title, price) {
		this.title = title;
		this.price = price;
	}

	render() {
		return `<div class="goods-item"><h3 class="goods-title">${this.title}</h3><p class="goods-price">${this.price} RUB</p><button class="add">Add</button></div>`
	}
}

class Bin {
	constructor() {
		this.goods = [];
		this.cart = [];
	}

	fetchGoods() {
		this.goods = [{
				title: 'Shirt',
				price: 150
			},
			{
				title: 'Socks',
				price: 50
			},
			{
				title: 'Jacket',
				price: 350
			},
			{
				title: 'Shoes',
				price: 250
			}
		]
	}

	render() {
		let listHtml = ``;
		this.goods.forEach(good => {
			const goodItem = new BinItem(good.title, good.price);
			listHtml += goodItem.render();
		});
		goodsList.innerHTML = listHtml;
	}

	addInCart() {
		const title = document.querySelectorAll('.goods-title');
		const price = document.querySelectorAll('.goods-price');
		const btnAdd = document.querySelectorAll('.add');
		for (let i = 0; i < btnAdd.length; i++) {
			btnAdd[i].addEventListener('click', () => {
				const cartItem = new BinItem(title[i].textContent, parseInt(price[i].textContent));
				this.cart.push(cartItem);
				console.log(this.cart);
				document.querySelector('.out').textContent = this.cart.length;
			})
		}
	}

	summ() {
		let summ = 0;
		this.cart.forEach(good => {
			summ += good.price;
		});
		document.querySelector('.goods-total').textContent = `Total: ${summ} RUB`;
	}
}

const list = new Bin();
list.fetchGoods();
list.render();
list.addInCart();
document.querySelector('#summ').addEventListener('click', () => list.summ());