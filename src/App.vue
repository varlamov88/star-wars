<template>
	<div id="app">
		<Header />
		<v-progress-circular
			indeterminate
			color="green"
			size="70"
			class="progress"
		/>
		<div class="content">
			<router-view />
		</div>
		<footer class="footer"></footer>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";

@Component({
	components: {
		Header,
	},
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	display: flex;
	flex-direction: column;
	height: 100%;
	min-height: 100vh;
}
.progress {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.content {
	display: flex;
	justify-content: center;
	padding-top: 90px;
}
.progress {
	margin: auto;
}
.footer {
	background-color: #000;
	height: 35px;
	width: 100%;
	margin-top: auto;
}
</style>
