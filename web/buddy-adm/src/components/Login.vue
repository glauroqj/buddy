<template lang="html">
	<div>
		<div class="row">
			<div class="col-md-offset-2 col-md-4 box-login">
				<div class="panel panel-default animated fadeIn">
					<div class="panel-heading text-center">
						<h3><i class="fa fa-lock" aria-hidden="true"></i> Login</h3>
					</div>
					<div class="panel-body">
						<div class="">
							<form method="post" autocomplete="on" v-on:submit.prevent>
								<div class="form-group">
									<label>E-mail</label>
									<input type="email" name="Email" class="form-control" id="" v-model="email">
								</div>
								<div class="form-group">
									<label>Senha</label>
									<input type="password" name="Password" class="form-control" id="" v-model="password">
								</div>

								<button class="btn btn-success" :disabled="email == '' && password == '' || verifying == true" type="submit" v-on:click="sendLogin()">
									<span v-if="!verifying">entrar</span>
									<span v-else>verificando...</span>
								</button>

							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Firebase from 'firebase'
import {config} from '../firebase.js'

export default {
	name: 'login',
	data () {
		return {
			email: '',
			password: '',
			verifying: false
		}
	},
	mounted() {
	},
	methods: {
		sendLogin: function() {
			var vm = this;
			this.verifying = true;
			Firebase.auth().signInWithEmailAndPassword(vm.email, vm.password).catch(function(error) {
				if ( !error.code ) {

				} else {
					vm.$toasted.show('Login/Senha inválidos! :(');
					vm.verifying = false;
					vm.reset();
				}
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorCode, errorMessage)
			});
		},
		reset: function() {
			this.email = '';
			this.password = '';
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box-login {
	margin-top: 10%;
}
</style>
