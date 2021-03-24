const goodsList = document.querySelector('.goods-list');

class BinItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }

  render() {
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price} RUB</p></div>`
  }
}

class Bin {
  constructor() {
    this.goods = [];
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

  summ() {
    let summ = 0;
    this.goods.forEach(good => {
      summ += good.price;
    });
    const total = document.querySelector('.goods-total');
    total.textContent = `Total: ${summ} RUB`;
  }
}

const list = new Bin();
list.fetchGoods();
list.render();
document.querySelector('#summ').addEventListener('click', () => list.summ())