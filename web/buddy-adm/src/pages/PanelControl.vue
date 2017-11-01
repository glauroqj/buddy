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
			<div class="col-xs-12">
				<div class="painelcontrole__title">
					<h3>Painel de Controle
						<span class="pull-right" v-if="btnRefresh">
							<button class="btn btn-warning btn-md" v-on:click="refreshData()">Recarregar Dados</button>
						</span>
					</h3>
				</div>
			</div>
			<div class="col-xs-12">
				<div class="painelcontrole__dashboard">
					<div class="painelcontrole__dashboard__title">
						<ul class="list-unstyled">
							<li>
								<vue-chart
								chart-type="LineChart"
								:columns="columns"
								:rows="titles"
								></vue-chart>
							</li>
						</ul>
						<ul class="list-unstyled" v-for="(item, index) in data" :index="index" :item="item">
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
			columns: [{
				'type': 'string',
				'label': 'Pontos'
			}, {
				'type': 'number',
				'label': 'Media'
			}],
			// rows: [
			// ['2004', 1000, 400],
			// ['2005', 1170, 460],
			// ['2006', 660, 1120],
			// ['2007', 1030, 540],
			// ['2006', 660, 1120],
			// ['2007', 1030, 540]
			// ],
			options: {
				title: 'Média Geral',
				hAxis: {
					title: 'Pontos',
					minValue: '1',
					maxValue: '5'
				},
				vAxis: {
					title: 'Setores',
					minValue: 1,
					maxValue: 5
				},
				height: 500
			},
			loading: true,
			data: {},
			dataLocal: '',
			btnRefresh: false,
			titles: [],
			media: []
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
					vm.loadingData();
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
			this.data = this.dataLocal;
			this.loading = false;
			this.btnRefresh = true;
			console.log('loading localStorage data')
			this.calculateInfos(this.data)
		},
		loadingData: function() {
			var vm = this;
			let url = config.databaseURL+'/.json';
			vm.$http.get(url).then(response => {
				vm.data = response.body;
				localStorage.setItem('Buddy-Admin-Votes', JSON.stringify(vm.data) );
				this.btnRefresh = true;
				console.log(vm.data)
				console.log('loading firebase data')
				console.log( Object.keys(vm.data.Produto) )
				vm.loading = false;
			}, response => {
				console.log('Error: '+response)
			});
		},
		refreshData: function() {
			this.loading = true;
			this.btnRefresh = false;
			setTimeout(() => {
				this.loadingData();
			}, 800);
		},
		calculateInfos: function(data) {
			var vm = this;

			for ( let key in data ) {
				/* key = setores */
				console.log(key)
				for ( let item in data[key] ) {
					let vote = 0;
					let voteTotalDay = 0;
					let voteTotalMonth = 0;
					let quantVotesDay = 0;
					let quantVotesMonth = 0;
					let newValue = 0;
					/* item = data */
					console.log('data: '+item)
					for ( let subitem in data[key][item].vote ) {
						/* subitem = key object */
						newValue = data[key][item];

						vote = data[key][item].vote[subitem].vote;
						console.log('Vote: '+vote)
						voteTotalDay = vote + voteTotalDay;
						/* number max of votes */
						quantVotesDay = Object.keys(data[key][item].vote);
					} /* for 3 */
					console.log('Vote Total: '+voteTotalDay)
					console.log('Quantidade de votos: '+quantVotesDay.length )

					/* insert new value on object | newValue */
					newValue.voteTotalDay = voteTotalDay;
					newValue.quantVotesDay = quantVotesDay.length;
					let mediaDay = (voteTotalDay / quantVotesDay.length);
					newValue.mediaDay = mediaDay.toFixed(1);

					// let a = {
					// 	'setor': key,
					// 	'valor': this.data[key][item].vote
					// }
					// vm.media.push(a)

				} /* for 2 */

				let colum = [key,4]
				vm.titles.push( colum );
				// console.log( this.data[key] )
			} /* for 1 */

		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
