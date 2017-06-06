import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Role from '../views/Role.vue'
import User from '../views/User.vue'

Vue.use(VueRouter);

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),

const routes = [{
	path:'/home',
	name:'home',
	component:Home
},{
	path:'/about',
	name:'about',
	component:About
},{
	path:'/login',
	name:'login',
	component:Login
},{
	path:'/role',
	name:'role',
	component:Role
},{
	path:'/user',
	name:'user',
	component:User,
	meta:{
		title:'用户',
		requiresAuth: true
	}
}]






const router = new VueRouter({
	mode: 'history', //切换路径模式，变成history模式
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



