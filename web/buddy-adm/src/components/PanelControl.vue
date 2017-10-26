<template lang="html">
	<div v-if="loading">
		<div class="row-fluid">
			<div class="col-xs-pull-2 col-xs-12 text-center">
				<loading text="Carregando Painel de Controle..." :height="80" :width="80"></loading>
			</div>
		</div>
	</div>
	<div v-else>
		<div class="col-xs-9">
			<h3>Lista itens menu</h3>
		</div>
		<div class="col-xs9">
			<ul class="list-inline">
				<li>
					<button class="btn btn-md btn-success">Ativar</button>
				</li>
				<li>
					<button class="btn btn-md btn-danger">Desativar</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Firebase from 'firebase'
import loading from '../components/Loading.vue'

export default {
	name: 'PanelControl',
	components:{
		loading
	},
	data() {
		return {
			loading: true
		}
	},
	created() {
		var vm = this;
		Firebase.auth().onAuthStateChanged((user) => {
			setTimeout(() => {
				if (user) {
					vm.loading = false;
				} else {
					vm.loading = true;
					vm.$router.push('/')
				}
			}, 1500);
		});
	},
	mounted() {
	},
	methods: {
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
