<template lang="html">
	<div>
		<div class="col-xs-9">
			<h3>Lista itens menu</h3>
		</div>
		<div class="col-xs9">
			<ul class="list-inline">
				<li>
					<button class="btn btn-md btn-success">Ativar</button>
				</li>
				<li>
					<button class="btn btn-md btn-danger">Desativar</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import Firebase from 'firebase'

	export default {
		name: 'PanelControl',
		components:{
		},
		data() {
			return {
			}
		},
		mounted() {
		},
		methods: {
			// hideMenu: function() {
			// 	this.$store.dispatch('menuHide');
			// },
			// showMenu: function() {
			// 	this.$store.dispatch('menuShow');
			// },
			// listItens: function() {
			// 	$.ajax({
			// 		url: 'https://portfolio-fe077.firebaseio.com/home/navbar.json',
			// 		method: 'GET'
			// 	})
			// 	.done(function(data) {
			// 		console.log('success', data) 
			// 	})
			// 	.fail(function(xhr) {
			// 		console.log('error', xhr);
			// 	});

			// }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
