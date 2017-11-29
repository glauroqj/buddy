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
			<div class="row">
				<div class="col-xs-12">
					<div class="setores__title">
						Setores
					</div>
				</div>
			</div>

			<div class="row">
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
							<div class="row" v-if="selected != ''">
								<div class="col-xs-4" v-for="item in selected.data">
									<div class="card animated fadeIn">
										<h3 class="card-header">{{item.date}}</h3>
										<div class="card-body text-muted">
											<ul class="list-unstyled">
												<li>Mês: {{item.month}}</li>
												<li>Quantidade: {{item.quantVotes}}</li>
												<li>Total Votos: {{item.vote}} </li>
												<li>Média Votos: <span :class="{'text-danger': item.mediaVotes <=1.80, 'text-success': item.mediaVotes >= 4.00}">{{item.mediaVotes}}</span></li>
												<li></li>
											</ul>									
										</div>
									</div>
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
			selected: {},
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
					vm.$router.push('/painel-de-controle');
					vm.$toasted.show('Atualizando dados, acesse setores novamente por gentileza!');
					return
				} 
				vm.$router.push('/');
			}, 1500);
		});

	},
	methods: {
		loadingDataLocal: function() {
			var vm = this;
			this.loading = false;
			console.log('loading localStorage data')
		},
		findSector: function(title) {
			var vm = this;
			// console.log(key)
			// console.log(this.dataLocal[key])
			this.selected = {}
			let arrayInfo = [];
			for( let year in this.dataLocal[title] ) {

				for( let month in this.dataLocal[title][year] ) {
					month = month;
					for( let day in this.dataLocal[title][year][month] ) {

						for( let key in this.dataLocal[title][year][month][day] ) {
							console.log(key)							
							arrayInfo.push(this.dataLocal[title][year][month][day][key]);
							/* CREATE ARRAY AND PUSH INFOS */
							this.selected = {
								'title': title,
								'data': arrayInfo
							}
						}/* for 4 */

					}/* for 3 */

				}/* for 2 */

			}/* for 1 */

			// let object = this.selected.data;
			// let monthObj = ['todos'];
			// vm.lastMonth = '';
			// /* verify month quantity */
			// for ( let day in object ) {
			// 	if ( vm.lastMonth != object[day].voteMonth  ) {
			// 		vm.lastMonth = object[day].voteMonth;
			// 		monthObj.push( object[day].voteMonth );
			// 		vm.selected.month = monthObj;
			// 	}
			// }/* for 1 */


		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
