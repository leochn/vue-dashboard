
//导入样式
import 'element-ui/lib/theme-default/index.css'


//导入Vue框架
import Vue from 'vue'
// axios
import axios from 'axios'

import store from "./store"
import { TOGGLE_SIDEBAR } from "./store/mutation-types"
import auth from "./auth";

//导入element组件
import ElementUI from 'element-ui'


//导入route组件
import router from './router'
//import router from './routerConfig.js'


//导入自定义插件
import Plugins from './plugins'

//导入主视图文件
import App from './App.vue'



//使用element-ui
Vue.use(ElementUI)

//使用自定义插件
Vue.use(Plugins)


// const instance = axios.create({
//   // // TODO: full base url
//   // baseURL: '//localhost:2080/api/',
//   //baseURL: '//jsonplaceholder.micua.com/',
//   //timeout: 100,
//   headers: {
//     // 在服务端的response的"Access-Control-Allow-Headers"设置了"Authorization"等,才可以使用.??是这样吗?postman测试的时候都不需要.
//     //response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token,Authorization");
//     'X-Requested-With': 'XMLHttpRequest',
//     'token': 'jdaksfffffffff;jlaffjkldsjfkljglkfdjsgjsjglfdjglk;',
//     'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkuamlhamlh'
//   }
// })

//Vue.prototype.$http = instance  //其他页面在使用axios的时候直接  this.$http就可以了

Vue.prototype.$http = axios  //其他页面在使用axios的时候直接  this.$http就可以了

const { state } = store

//路由开始之前的操作
router.beforeEach((route, redirect, next) => {
  if (state.device.isMobile && state.sidebar.opened) {
    store.commit(TOGGLE_SIDEBAR, false);
  }
  if (!auth.loggedIn() && route.path !== '/login') {
    next({
      path: '/login',
      query: { redirect: route.fullPath }
    })
  } else {
    next()
  }
})

// axios.interceptors.request.use(
//   config => {
//     // 判断是否存在token，如果存在的话，则每个http header都加上token
//     // 在服务端的response的"Access-Control-Allow-Headers"设置了 Authorization ,才可以用.
//     console.log('axios.interceptors.request.use......................');
//     config.headers.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJp';
//     return config;
//   },
//   err => {
//     return Promise.reject(err)
//   })

axios.interceptors.request.use(
  config => {
    if (window.localStorage.getItem('imp-sid')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      //console.log('imp-sid-->request.use:'+ window.localStorage.getItem('imp-sid'));
      config.headers.Authorization = window.localStorage.getItem('imp-sid');
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });


axios.interceptors.response.use(
  response => {
    if (response.data && response.data.code) {
      if (response.data.code === '1002') {
        // 1002 为未登陆状态.
        auth.logout()
        router.push({path: '/login'});
      }
    }
    return response;
  },
  error => {
    if (error.response) {
      //alert(error.response.data);
      if (error.response.status == '401') {
        console.log('401-401-401-401');
        auth.logout()
        router.push({path: '/login'});
      } 
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
