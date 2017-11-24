<template lang="html">
	<div v-if="statusSidebar == true">
		<div class="sidebar animated fadeInLeft">
			<ul class="list-group">
				<li class="list-group-item" v-for="list in lists">
					<a :href="list.link" :class="{'active': list.link == route}" v-on:click="">{{list.title}}</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Firebase from 'firebase'
import {config} from '../firebase.js'

export default {
	name: 'sideBar',
	props: {
		statusSidebar: Boolean
	},
	data() {
		return {
			lists: [{
				title: 'Painel de Controle',
				link: '#/painel-de-controle'
			},
			{
				title: 'Setores',
				link: '#/setores'
			},
			{
				title: 'Mensagem Personalizada',
				link: '#/mensagem-personalizada'
			}
			],
			route: ''
		}
	},
	computed: {
	},
	watch: {
	},
	mounted() {
		var vm = this;
		let a = window.location.hash;
		vm.route = a;
		this.$root.$on('verify-route', ()=> {
			vm.activeMenu()
		});
	},
	methods: {
		activeMenu: function() {
			var vm = this;
				let a = window.location.hash;
				vm.route = a;
			setTimeout(() => {
			}, 350);
		}
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
