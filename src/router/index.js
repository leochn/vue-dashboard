import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Role from '../views/Role.vue'
import User from '../views/User.vue'
import app from "../App.vue";

Vue.use(VueRouter);

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),

const routes = [{
	path:'/login',
	name:'login',
	component:Login
},
// {
// 	path:'',
// 	component:app,
// 	children:[
// 		{path:'/home',component:Home},
// 		{path:'/user',component:User},
// 		{path:'/role',component:Role},
// 		{path:'/about',component:About}
// 	]
// },
{path:'/home',name:'home',component:Home},
{path:'/index',name:'index',component:Index},
{path:'/user',name:'user',component:User},
{path:'/role',name:'role',component:Role},
{path:'/about',name:'about',component:About}
]



const router = new VueRouter({
	//mode: 'history', //切换路径模式，变成history模式
	scrollBehavior: () => ({ y: 0 }), // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
	routes
});



//全局路由配置
//路由开始之前的操作
// ........



//路由完成之后的操作
// ........



export default router

// 不能这样export,否则会报错.为什么呢?不知道...
/*export default {
	router
} */



