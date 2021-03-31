const URL = 'https://sasha20044002.github.io/dz-js-2/catalog.json';

const vue = new Vue({
  el: '#vue',
  data: {
    goods: [],
    filteredGoods: [],
    basketGoods: [],
    searchLine: '',
    totalSum: '',
    isVisibleCart: false,
  },
  methods: {
    makeGetRequest(url, cb) {
      let xhr;

      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          cb(xhr.responseText);
        }
      }

      xhr.open('GET', url, true);
      xhr.send();
    },

    addToBasket(id) {
      let toBasket;
      this.goods.forEach(function (item) {
        if (id == item.id) {
          toBasket = {
            id: item.id,
            title: item.title,
            price: item.price,
          }
        }
      });
      this.basketGoods.push(toBasket);
      this.sum();
    },

    deleteFromBasket(id) {
      let itemId;
      this.basketGoods.forEach((item, i) => {
        let thisId = item.id;
        if (id == thisId) {
          itemId = i;
        }
      });
      this.basketGoods.splice(itemId, 1);
      this.sum();
    },

    sum() {
      let totalPrice = 0;
      this.basketGoods.forEach((good) => {
        if (good.price !== undefined) {
          totalPrice += good.price;
        }
      });
      this.totalPriceMessage = `Cумма товаров в корзине: ${totalPrice}`;
    },

    filterGoods() {
      let regexp = new RegExp(this.searchLine, 'i');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.title))
    },
    
    viewCart() {
      switch (this.isVisibleCart) {
        case(false): {
          this.isVisibleCart = true;
          break;
        }

        case(true): {
          this.isVisibleCart = false;
          break;
        }
      }
    }
  },
  mounted() {
    this.makeGetRequest(URL, (goods) => {
      this.goods = JSON.parse(goods);
      this.filteredGoods = JSON.parse(goods);
    });
    this.sum();
  }
})

function addBasket(event) {
  vue.addToBasket(event.target.id);
};

function deleteItem(event) {
  vue.deleteFromBasket(event.target.id);
}