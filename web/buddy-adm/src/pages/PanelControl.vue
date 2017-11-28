<template lang="html">
	<div class="painelcontrole">
		<div v-if="loading">
			<div class="row-fluid">
				<div class="col-xs-6 text-center">
					<loading text="Carregando Painel de Controle..." :height="80" :width="80"></loading>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="row">
				<div class="col-xs-12">
					<div class="painelcontrole__title">
						Painel de Controle
						<span class="pull-right" v-if="btnRefresh">
							<button class="btn btn-warning btn-md" v-on:click="refreshData()">Recarregar Dados</button>
						</span>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-xs-12">
					<div class="painelcontrole__dashboard">
						<div class="painelcontrole__dashboard__card clearfix" v-for="(area, index) in data" :index="index" :area="area">
							<div class="card-title col-xs-12">{{index}}</div>
							<div class="card-body col-xs-12 clearfix" v-for="(year, index) in area" :index="index" :year="year">
								<div class="title">{{index}}</div>
								<div class="month clearfix" v-for="(month, index) in year" :index="index" :month="month">
									<h5>{{index}}</h5>
									<div class="col-xs-3" v-for="(day, index, key) in month">
										<ul class="list-inline">
											<li v-for="(item, index, key) in day" :key="key">
												<div>Dia: {{item.date}}</div>
												<div>Média Votos: 
													<span :class="{'text-danger': item.mediaVotes <=1.80, 'text-success': item.mediaVotes >= 4.00}">{{item.mediaVotes}}</span>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
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
import moment from 'moment'
import deep from 'deep-get-set'

export default {
	name: 'PanelControl',
	components:{
		loading
	},
	data() {
		return {
			loading: true,
			data: {},
			dataLocal: '',
			btnRefresh: false
		}
	},
	mounted() {
		var vm = this;

		this.$root.$emit('verify-route');

		vm.dataLocal = JSON.parse( localStorage.getItem('Buddy-Admin-Votes') );

		Firebase.auth().onAuthStateChanged((user) => {
			setTimeout(() => {
				if (user && vm.dataLocal != null) {
					vm.loadingDataLocal();
					return
				}
				if (user && vm.dataLocal == null ) {
					vm.loadingData();
					return
				} 
				vm.$router.push('/');
			}, 1500);
		});
	},
	methods: {
		menu: function() {
			var vm = this;
			this.$root.$emit('verify-route');
		},
		loadingDataLocal: function() {
			var vm = this;
			this.data = this.dataLocal;
			this.loading = false;
			this.btnRefresh = true;
			console.log('loading localStorage data')
		},
		loadingData: function() {
			var vm = this;
			let url = config.databaseURL+'/.json';
			vm.$http.get(url).then(response => {
				vm.data = response.body;
				/* remove custom mesasge */
				delete vm.data.customMessage;

				localStorage.removeItem('Buddy-Admin-Votes');
				localStorage.setItem('Buddy-Admin-Votes', JSON.stringify(vm.data) );
				this.btnRefresh = true;
				vm.loading = false;
				console.log('loading firebase data')
			}, response => {
				if(response.status != 200) {
					console.log('Error: '+response)
				}
			});
		},
		refreshData: function() {
			this.loading = true;
			this.btnRefresh = false;
			setTimeout(() => {
				this.loadingData();
			}, 800);
		}
		}
	}
	</script>

	<!-- Add "scoped" attribute to limit CSS to this component only -->
	<style scoped>

	</style>
