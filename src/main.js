//导入样式
import 'element-ui/lib/theme-default/index.css'


//导入Vue框架
import Vue from 'vue'
// axios
import axios from 'axios'

//导入element组件
import ElementUI from 'element-ui'


//导入route组件
import router from './router'
//import router from './routerConfig.js'

//导入主视图文件
import App from './App.vue'



//使用element-ui
Vue.use(ElementUI)

Vue.prototype.$http = axios  //其他页面在使用axios的时候直接  this.$http就可以了

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
