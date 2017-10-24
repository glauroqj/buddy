<template lang="html">
	<div v-show="statusnavbar == true">
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#/painel-de-controle">
						Área Autenticada Buddy
					</a>
				</div>

				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav navbar-right">
						<li v-if="loading==true">
							<loading :height="30" :width="30"></loading>
						</li>
						<li class="dropdown" v-else>
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
								Menu <span class="caret"></span>
							</a>
							<ul class="dropdown-menu">
								<li><a class="disabled">{{name}}</a></li>
								<li role="separator" class="divider"></li>
								<li>
									<a href="/" v-on:click="logout()">Sair</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
	import Firebase from 'firebase'
	import {config} from '../firebase.js'
	import loading from '../components/Loading.vue'

	export default {
		name: 'navBar',
		props: {
			statusnavbar: Boolean
		},
		components:{
			loading
		},
		data () {
			return {
				title: '',
				photo: '',
				userId: '',
				name: '',
				email: '',
				user: '',
				loading: true
			}
		},
		mounted() {
			var vm = this;
			this.getUser();
		},
		methods: {
			logout: function() {
				this.$ls.set('show_name_user', false);
				Firebase.auth().signOut();
				this.$router.push('/');
				this.$store.dispatch('hideNavbar');
				this.$store.dispatch('menuHide');
			},
			getUser: function() {
				var vm = this;
				this.user = Firebase.auth().currentUser;
				if(this.user) {
					this.loading = false;
					this.name = this.user.displayName;
					this.email = this.user.email; 
					this.photo = this.user.photoURL; 
					this.userId = this.user.uid;
				} else {
					this.loading = true;
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
