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
						<ul class="nav nav-pills">
							<li class="nav-item" v-for="(item, index, key) in dataLocal">
								<a class="btn" :class="selected.title == index ? 'active':''" :id="key" v-on:click="findSector(index)">{{index}}</a>
							</li>
						</ul>
					</div>
					<div class="setores__dashboard__card">
						<div class="col-xs-4" v-for="(item, index, key) in selected.data" :index="index" :item="item">
							<div class="card animated fadeIn">
								<h3 class="card-header">{{index}}</h3>
								<div class="card-body text-muted">
									<p>
										Média do dia: <span class="" 
										:class="[{'text-success':item.mediaDay >= 4.0}, {'text-muted':item.mediaDay > 3.0}, {'text-danger':item.mediaDay <= 2.5}]">{{item.mediaDay}}</span>
									</p>
									<p>
										Quantidade de votos do dia: {{item.quantVotesDay}}
									</p>
								</div>
							</div>
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
			selected: {}
		}
	},
	mounted() {
		var vm = this;

		console.log(this.$parent)

		// console.log(this.$route.path)

		vm.dataLocal = JSON.parse( localStorage.getItem('Buddy-Admin-Votes') );

		Firebase.auth().onAuthStateChanged((user) => {
			setTimeout(() => {
				if (user && vm.dataLocal != null) {
					vm.loadingDataLocal();
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
		findSector: function(key) {
			var vm = this;
			console.log(key)
			console.log(this.dataLocal[key])
			this.selected = {}
			this.selected = {
				'title': key,
				'data': this.dataLocal[key]
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
