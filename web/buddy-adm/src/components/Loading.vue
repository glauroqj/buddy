<template lang="html">
	<div>
		<div class="loading">
			<img src="../assets/images/loading.gif" :height="height" :width="width" alt="loading"> Carregando...
		</div>
	</div>
</template>

<script>
	export default {
		name: 'loading',
		props: {
			height: {
				Number,
				required: true
			},
			width: {
				Number,
				required: true
			}
		},
		data () {
			return {
			}
		},
		mounted() {

		},
		methods: {
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.loading {
		display: block;
	}
</style>