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
							<div class="form-group">
								<div class="col-xs-8">
									<textarea name="" id="" cols="5" rows="3" class="form-control"></textarea>
								</div>
							</div>
							<div class="form-group">
								<div class="col-lg-12">
										<!-- 									
										<button v-show="edit == false" :disabled="accEmail == '' || accName == ''" type="submit" class="btn btn-primary" v-on:click="sendDataAccount()">Salvar</button>
										<button v-show="edit == true" :editkey="editKey" :disabled="accEmail == '' || accName == '' || urlImage == ''" type="submit" class="btn btn-warning" v-on:click="sendEditAccount(editKey)">Salvar alterações</button> -->
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

	export default {
		name: 'CustomMessage',
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

			this.$root.$emit('verify-route');

			Firebase.auth().onAuthStateChanged((user) => {
				setTimeout(() => {
					if (user != null) {
						vm.loadingDataLocal();
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
			}
		}
	}
	</script>

	<!-- Add "scoped" attribute to limit CSS to this component only -->
	<style scoped>

	</style>
