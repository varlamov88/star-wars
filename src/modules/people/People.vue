<template>
	<div class="home"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions } from "vuex";
import { namespace } from "./store";

@Component({
	methods: {
		...mapActions(namespace, ["load"]),
	},
	components: {},
})
export default class Home extends Vue {
	// eslint-disable-next-line @typescript-eslint/ban-types
	load!: Function;

	created() {
		console.log(111);

		this.load();
	}
}
</script>
