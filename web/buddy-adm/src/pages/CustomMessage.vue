<template lang="html">
	<div class="custommessage">
		<div v-if="loading">
			<div class="row-fluid">
				<div class="col-xs-6 text-center">
					<loading text="Carregando Mensagem Personalizada..." :height="80" :width="80"></loading>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="row">
				<div class="col-xs-12">
					<div class="custommessage__title">
						Mensagem Personalizada
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-xs-12">
					<div class="custommessage__dashboard clearfix">
						<div class="col-xs-12">
							<div class="title">Informe abaixo a mensagem que seja exibir para todos os usuários do Buddy!</div>
						</div>
						<form class="" v-on:submit.prevent>
							<div class="col-xs-8">
								<div class="form-group">
									<textarea maxlength="50" name="" id="" cols="5" rows="2" class="form-control" v-model="message" :disabled="edit"></textarea>
								</div>
							</div>
							<div class="col-lg-8">						
								<div class="form-group">
									<button v-if="datakey == ''" :disabled="message == ''" type="submit" class="btn btn-primary" v-on:click="sendMessage()">Salvar</button>

									<button v-else-if="datakey != '' && !edit" :datakey="datakey" :disabled="message == ''" type="submit" class="btn btn-success" v-on:click="saveEditMessage(datakey)">Salvar Alterações</button>

									<button v-else :disabled="message == ''" type="submit" class="btn btn-warning" v-on:click="editMessage()">Editar</button>

								</div>
							</div>
						</form>
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
import moment from 'moment'

export default {
	name: 'CustomMessage',
	components:{
		loading
	},
	data() {
		return {
			loading: true,
			data: '',
			message: '',
			datakey: '',
			edit: false
		}
	},
	mounted() {
		var vm = this;

		this.$root.$emit('verify-route');

		Firebase.auth().onAuthStateChanged((user) => {
			setTimeout(() => {
				if (user != null) {
					vm.loadingActualMessage();
					return
				} 
				vm.$router.push('/');
			}, 1500);
		});
	},
	methods: {
		loadingActualMessage: function() {
			var vm = this;

			let url = config.databaseURL+'/customMessage.json';
			vm.$http.get(url).then(response => {
				vm.data = response.body;
				if(vm.data == null) {
					vm.loading = false;
					vm.edit = false;
					return;
				}
				vm.datakey = Object.keys(vm.data)[0];
				vm.message = vm.data[vm.datakey];
				vm.loading = false;
				vm.edit = true;
			}, response => {
				if (response.status != 200) {
					vm.loading = false;
					vm.edit = false;
					vm.$toasted.show('Erro ao carregar! :(');
					console.log('Error: '+response)
				}
			});
		},
		sendMessage: function() {
			var vm = this;

			let url = config.databaseURL+'/customMessage.json';
			let data = JSON.stringify(vm.message);
			vm.$http.post(url, data).then(response => {
				vm.data = response.body;
				vm.datakey = vm.data.name;
				vm.edit = true;
				vm.$toasted.show('Mensagem salva com sucesso!');
				console.log('send message to database')
			}, response => {
				if (response.status != 200) {
					vm.$toasted.show('Erro :(');
					console.log(response)
				}
			});

		},
		editMessage: function() {
			var vm = this;
			this.edit = false;
		},
		saveEditMessage: function(datakey) {
			var vm = this;
			let url = config.databaseURL+'/customMessage/'+[datakey]+'.json';
			let data = JSON.stringify(vm.message);
			vm.$http.put(url, data).then(response => {
				vm.data = response.body;
				vm.$toasted.show('Mensagem alterada com sucesso!');
				vm.edit = true;
				console.log('send message to database')
			}, response => {
				if (response.status != 200) {
					vm.$toasted.show('Erro :(');
					console.log(response)
				}
			});
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
