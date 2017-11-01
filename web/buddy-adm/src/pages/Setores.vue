<template lang="html">
	<div class="setores">
		<div v-if="loading">
			<div class="row-fluid">
				<div class="col-xs-6 text-center">
					<loading text="Carregando Setores..." :height="80" :width="80"></loading>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="col-xs-12">
				<div class="setores__title">
					<h3>Setores</h3>
				</div>
			</div>
			<div class="col-xs-12">
				<div class="setores__dashboard">
					<div class="setores__dashboard__title">

						<ul class="nav nav-tabs">
							<li class="" v-for="(item, index, key) in dataLocal">
								<a :id="key" v-on:click="showTab(key)">{{index}}</a>
							</li>
						</ul>
						<div id="contents" class="tab-content">
							<template v-if="tabNumber == key"  v-for="(item, index, key) in dataLocal">
								
							</template>

<!-- 							<div class="tab-pane fade" :id="'#'+key" v-for="(item, index, key) in dataLocal" :index="index" :item="item">
								<h2>{{index}}</h2>
								
								<li v-for="(subitem, index) in item" :index="index" :subitem="subitem.vote">
									<div>
										<span><b>{{index}}</b></span>
									</div>
									<ul class="list-inline">
										<li v-for="(subSubitem, index) in subitem.vote" :index="index" :subSubitem="subSubitem">
											<span>Voto: {{subSubitem.vote}}</span>
										</li>
									</ul>
									<div>
										<span><h6>Quantidade de votos do dia: <b>{{subitem.quantVotesDay}}</b></h6></span>
										<span><h6>Media de votos do dia: <b>{{subitem.mediaDay}}</b></h6></span>
									</div>
									<br>
								</li>

							</div> -->
						</div>

					</div>
				</div>
			</div>
		</div>
	</div> <!-- setores -->
</template>

<script>
import Firebase from 'firebase'
import {config} from '../firebase.js'
import loading from '../components/Loading.vue'

export default {
	name: 'Setores',
	components:{
		loading
	},
	data() {
		return {
			loading: true,
			dataLocal: {},
			tabNumber: null
		}
	},
	mounted() {
		var vm = this;

		vm.dataLocal = JSON.parse( localStorage.getItem('Buddy-Admin-Votes') );

		Firebase.auth().onAuthStateChanged((user) => {
			setTimeout(() => {
				if (user && vm.dataLocal != null) {
					vm.loadingDataLocal()
				} else if (user && vm.dataLocal == null ) {
					vm.$router.push('/painel-de-controle');
					vm.$toasted.show('Atualizando dados, acesso setores novamente por gentileza!');
				} 
				else {
					vm.$router.push('/');
				}
			}, 1500);
		});
	},
	methods: {
		loadingDataLocal: function() {
			var vm = this;
			this.loading = false;
			console.log('loading localStorage data')
		},
		showTab: function(key) {
			var vm = this;
			vm.tabNumber = key;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
