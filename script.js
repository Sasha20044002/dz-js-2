function addBasket(id) {
  cart.addToBasket(id);
};

function deleteItem(id) {
  cart.deleteFromBasket(id);
};

function makeGETRequest(url, callback) {
  var xhr;

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(xhr.responseText);
    }
  }

  xhr.open('GET', url, true);
  xhr.send();
}
class GoodItem {
  constructor(id, title = 'Товар', price = 'Цена по запросу') {
    this.id = id;
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><div class="goods-info"><h3>${this.title}</h3><p>${this.price}</p></div><button class='addClick' onclick='addBasket(${this.id})'>Добавить</button></div>`;
  }
}
class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods(url) {
    makeGETRequest(url, (good) => {
      this.goods = JSON.parse(good);
      this.render();
      this.calcAllGoods();
    })
  }
  render() {
    let listHtml = '';
    this.goods.forEach((good) => {
      const goodItem = new GoodItem(good.id, good.title, good.price);
      listHtml += goodItem.render();
    })
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
  calcAllGoods() {
    let totalPrice = 0;
    this.goods.forEach((good) => {
      if (good.price !== undefined) {
        totalPrice += good.price;
      }
    });
    let totalGoodsAnswer = "Все товары на сумму $" + totalPrice;
    document.querySelector('.goods-total').innerHTML = totalGoodsAnswer;
  }
}

class BasketItem {
  constructor(id, title, price) {
    this.id = id;
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="basket-item"><div class="basket-info"><h3>${this.title}</h3><p>${this.price}</p></div><button class='deleteItem' onclick='deleteItem(${this.id})'>&times;</button></div>`;
  }
}
class Basket {
  constructor() {
    this.cartGoods = [];
  }

  addToBasket(id) {
    let toBasket;
    list.goods.forEach(function (item) {
      if (id == item.id) {
        toBasket = {
          id: item.id,
          title: item.title,
          price: item.price
        }
      }
    });
    this.cartGoods.push(toBasket);
    this.basketCount();
  }

  deleteFromBasket(id) {
    let getIdElemen;
    this.cartGoods.forEach(function (item, i) {
      let thisId = item.id;
      if (id == thisId) {
        getIdElemen = i;
      }
    });
    this.cartGoods.splice(getIdElemen, 1);
    this.render();
    this.basketCount();
  }

  calcAllGoods() {
    let totalPrice = 0;
    this.cartGoods.forEach((good) => {
      if (good.price !== undefined) {
        totalPrice += good.price;
      }
    });
    let totalGoodsAnswer = "Общая сумма товаров в корзине: $" + totalPrice;
    document.querySelector('.goods-total').innerHTML = totalGoodsAnswer;
  }

  basketCount() {
    let count = this.cartGoods.length;
    document.getElementById('cartcoint').innerHTML = ' (' + count + ')';
  }

  render() {
    let readHtml = '';
    this.cartGoods.forEach((good) => {
      const goodItem = new BasketItem(good.id, good.title, good.price);
      readHtml += goodItem.render();
    })
    document.querySelector('.cart-list').innerHTML = readHtml;
    this.calcAllGoods();
  }
}

const list = new GoodsList();
const cart = new Basket();
list.fetchGoods('https://sasha20044002.github.io/dz-js-2/catalog.json');