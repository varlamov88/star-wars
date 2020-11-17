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
export default class PeopleDetail extends Vue {}
</script>
