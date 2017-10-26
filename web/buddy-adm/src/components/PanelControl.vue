<template lang="html">
	<div class="painelcontrole">
		<div v-if="loading">
			<div class="row-fluid">
				<div class="col-xs-pull-2 col-xs-12 text-center">
					<loading text="Carregando Painel de Controle..." :height="80" :width="80"></loading>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="col-xs-12">
				<div class="painelcontrole__title">
					<h3>Painel de Controle</h3>
				</div>
			</div>
			<div class="col-xs-12">
				<div class="painelcontrole__dashboard">
					<div class="painelcontrole__dashboard__title">
						<ul class="list-unstyled" v-for="(item, index) in data" :index="index" :item="item">
							<h2>{{index}}</h2>
							<li v-for="(subitem, index) in item" :index="index" :subitem="subitem.vote">
								<div><b>{{index}}</b></div>
								<ul class="list-inline">
									<li v-for="(subSubitem, index) in subitem.vote" :index="index" :subSubitem="subSubitem">
										<span>Voto: {{subSubitem.vote}}</span>
									</li>
								</ul>
								<br>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div> <!-- painelcontrole -->
</template>

<script>
import Firebase from 'firebase'
import {config} from '../firebase.js'
import loading from '../components/Loading.vue'

export default {
	name: 'PanelControl',
	components:{
		loading
	},
	data() {
		return {
			loading: true,
			data: {},
			titles: []
		}
	},
	mounted() {
		var vm = this;
		Firebase.auth().onAuthStateChanged((user) => {
			setTimeout(() => {
				if (user) {
					vm.loadingData();
				} else {
					vm.$router.push('/')
				}
			}, 1500);
		});
	},
	methods: {
		loadingData: function() {
			var vm = this;
			let url = config.databaseURL+'/.json';
			vm.$http.get(url).then(response => {
				vm.data = response.body;
				console.log(vm.data)
				console.log( Object.keys(vm.data.Produto) )
				vm.loading = false;
			}, response => {
				console.log('Error: '+response)
			});
			// $.ajax({
			// 	url: url,
			// 	method: 'GET'
			// })
			// .done(function(data) {
			// 	console.log(data);
				// if( vm.user == true ) {
				// 	vm.loading = false;
				// }
			// })
			// .fail(function(xhr) {
			// 	console.log('error', xhr);
			// });
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
