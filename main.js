const vue = new Vue({
  el: '#vue',
  data: {
    title: 'Title',
  },
  methods: {
    timeOut() {
      setTimeout(() => {
        this.title = 'Name'
      }, 2000)
    }
  }
})