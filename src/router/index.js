import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Role from '../views/Role.vue'
import User from '../views/User.vue'
import Layout from "../views/Layout.vue";

Vue.use(VueRouter);

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),

const routes = [{
	path: '/login',
	name: 'login',
	component: Login
},
{
	path: '/',
	component: Layout,
	children: [
		{ path: '/home', name: 'home', component: Home },
		{ path: '/index', name: 'index', component: Index },
		{ path: '/sys/users', name: 'user', component: User },
		{ path: '/role', name: 'role', component: Role },
		{ path: '/about', name: 'about', component: About }
	]
}
]

const router = new VueRouter({
	//mode: 'history', //切换路径模式，变成history模式
	scrollBehavior: () => ({ y: 0 }), // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
	routes
});


export default router

// 不能这样export,否则会报错.为什么呢?不知道...
/*export default {
	router
} */



