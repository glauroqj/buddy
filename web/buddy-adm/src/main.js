// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueFire from 'vuefire'
import App from './App'
import Firebase from 'firebase'
import {config} from './firebase.js'
import Toasted from 'vue-toasted'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import './assets/js/jquery.min.js'
import './assets/js/bootstrap.min.js'

/* pages */
import Login from './pages/Login.vue'
import PanelControl from './pages/PanelControl.vue'
import Setores from './pages/Setores.vue'

/*components*/
import Loading from './components/Loading.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'


Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueFire);
Vue.use(VueResource);
let Options = {
	theme: 'primary',
	position: 'top-right',
	duration: 5000
}
Vue.use(Toasted, Options)


Vue.config.productionTip = false

const routes = [ 
{ path: '/', component: Login },
{ path: '/painel-de-controle', auth: true, component: PanelControl },
{ path: '/setores', auth: true, component: Setores },
{ path: '*', redirect: '/painel-de-controle' }
]

const router = new VueRouter({
	routes
});

/* eslint-disable no-new */
new Vue({
	router,
	el: '#app',
	created() {
		Firebase.initializeApp(config);
	},
	template: '<App/>',
	components: { App }
});