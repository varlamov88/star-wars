<template>
	<div id="app">
		<v-app>
			<v-progress-circular
				v-if="isLoaderVisible"
				indeterminate
				color="green"
				size="70"
				class="progress"
			/>

			<v-snackbar
				bottom
				right
				:color="snackBar.color"
				v-model="snackBar.visible"
				>{{ snackBar.text }}</v-snackbar
			>

			<Header />

			<v-main>
				<transition name="fade" mode="out-in">
					<div class="content pb-3" :key="`content-block-${$route.fullPath}`">
						<router-view />
					</div>
				</transition>
			</v-main>

			<footer class="footer"></footer>
		</v-app>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import { mapState } from "vuex";

@Component({
	computed: {
		...mapState(["isLoaderVisible", "snackBar"]),
	},
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
