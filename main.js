const URL = 'https://sasha20044002.github.io/dz-js-2/catalog.json';

const vue = new Vue({
  el: '#vue',
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: ''
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
    }
  },
  mounted() {
    this.makeGetRequest(URL, (goods) => {
      this.goods = goods;
      this.filteredGoods = goods;
    });
  }
})