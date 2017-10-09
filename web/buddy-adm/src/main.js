// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueFire from 'vuefire'
import Firebase from 'firebase'
import Firebaseui from 'firebaseui';
import {config} from './firebase.js'
import VueRouter from 'vue-router'

import App from './App'

import '../node_modules/normalize.css'
import '../node_modules/jquery/dist/jquery.min.js'

/*components*/
import Login from './components/Login.vue'
import PanelControl from './components/PanelControl.vue'

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueFire);


Vue.config.productionTip = false

const routes = [ 
{ path: '/', component: Login },
{ path: '/painel-de-controle', auth: true, component: PanelControl }
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