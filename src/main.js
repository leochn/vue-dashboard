import Vue from 'vue'
import App from './App.vue'


//导入组件
import router from './router'

//import router from './routerConfig.js'

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
