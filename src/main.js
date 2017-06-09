
//导入样式
import 'element-ui/lib/theme-default/index.css'


//导入Vue框架
import Vue from 'vue'
//导入主视图文件
import App from './App.vue'
//导入element组件
import ElementUI from 'element-ui'

//导入路由组件
import router from './router'
//import router from './routerConfig.js'



//使用element-ui
Vue.use(ElementUI)


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
