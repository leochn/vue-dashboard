
//导入样式
import 'element-ui/lib/theme-default/index.css'


//导入Vue框架
import Vue from 'vue'
// axios
import axios from 'axios'

import store from "./store"
import {TOGGLE_SIDEBAR} from "./store/mutation-types"
import auth from "./auth";

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

const {state} = store

//路由开始之前的操作
router.beforeEach((route, redirect, next) => {
  console.log('auth.loggedIn()=' + auth.loggedIn());
  console.log('router.beforeEach........');
  if (state.device.isMobile && state.sidebar.opened) {
    console.log('router.beforeEach.if.......');
    store.commit(TOGGLE_SIDEBAR, false);
  }
  if (!auth.loggedIn() && route.path !== '/login') {
    console.log('router.beforeEach.....2if...');
    next({
      path: '/login',
      query: {redirect: route.fullPath}
    })
  } else {
    console.log('router.beforeEach.....2if  else...');
    next()
  }
})

axios.interceptors.response.use(
  response => {
    if (response.data && response.data.code) {
      if (response.data.code === '2001') {
        auth.logout()
      }
    }
    return response;
  },
  error => {
    if (error.response) {
      //全局ajax错误信息提示
      // Element.MessageBox({type:"error",message:error.response.data,title:"温馨提示"});
    }
    return Promise.reject(error);
  });


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
