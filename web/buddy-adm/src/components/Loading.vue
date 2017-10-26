<template lang="html">
	<div>
		<div class="loading">
			<img src="../assets/img/loading.gif" :height="height" :width="width"> {{text}}
		</div>
	</div>
</template>

<script>
export default {
	name: 'loading',
	props: {
		text: {
			type: String
		},
		height: {
			type: Number,
			required: true
		},
		width: {
			type: Number,
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