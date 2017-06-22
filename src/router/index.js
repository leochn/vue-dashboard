import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Role from '../views/Role.vue'
import User from '../views/User.vue'
import User2 from '../views/User2.vue'
import User3 from '../views/User3.vue'
import Layout from "../views/Layout.vue";
import Err401 from "../views/401.vue";
import Err404 from "../views/404.vue";
import AddUser from "../views/addUser.vue";

Vue.use(VueRouter);

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),

const routes = [
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/401',
		name: 'err401',
		component: Err401
	},
	{
		path: '/',
		component: Layout,
		children: [
			{ path: '/home', name: 'home', component: Home },
			{ path: '/index', name: 'index', component: Index },
			{ path: '/err/401', name: '401', component: Err401 },
			{ path: '/err/404', name: '404', component: Err404 },
			{ path: '/sys/users', name: 'user', component: User },
			{ path: '/sys/users2', name: 'user2', component: User2 },
			{ path: '/sys/users3', name: 'user3', component: User3 },
			{ path: '/sys/users/put', name: 'updateUser', component: User2 },
			{ path: '/sys/users/add', name: 'addUser', component: AddUser },
			{ path: '/role', name: 'role', component: Role },
			{ path: '/about', name: 'about', component: About }
		]
	},
	{ path: '*', redirect: '/401', hidden: true }
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



