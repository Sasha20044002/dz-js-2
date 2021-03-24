const goodsList = document.querySelector('.goods-list');

function makeGETRequest(url, cb) {
  let xhr;

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadychange = () => {
    if (xhr.readyState === 4) {
      cb(xhr.responseText);
    }
  }

  xhr.open("GET", url);
  xhr.send();
}
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
    makeGETRequest("catalog.json", (goods) => {
      this.goods = JSON.parse(goods);
    })
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