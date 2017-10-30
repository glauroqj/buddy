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
					<h3>Setores
						<span class="pull-right" v-if="btnRefresh">
							<button class="btn btn-warning btn-md" v-on:click="refreshData()">Recarregar Dados</button>
						</span>
					</h3>
				</div>
			</div>
			<div class="col-xs-12">
				<div class="setores__dashboard">
					<div class="setores__dashboard__title">
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
		}
	},
	mounted() {
		var vm = this;

		Firebase.auth().onAuthStateChanged((user) => {
			setTimeout(() => {
				if (user ) {
					// vm.loadingDataLocal()
				} else {
					vm.$router.push('/');
				}
			}, 1500);
		});
	},
	methods: {

	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
