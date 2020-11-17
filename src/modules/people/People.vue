<template>
	<div class="people">
		<v-container>
			<v-row>
				<v-col v-for="item in people" :key="item.url" cols="12" sm="6">
					<Card :people="item" max-width="570" />
				</v-col>
			</v-row>
		</v-container>

		<v-pagination
			v-if="pagesCount"
			:value="currentPage"
			:length="5"
			@input="pageChanged"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapState } from "vuex";
import { ILooseObject } from "@/interfaces";
import { PER_PAGE } from "@/config";
import Card from "./components/Card.vue";
import { namespace } from "./store";
import { PeopleRouteNames } from "./router";

@Component({
	computed: {
		...mapState(namespace, ["people", "peopleCount", "dictionaries"]),
	},
	methods: {
		...mapActions(namespace, ["loadPeople", "loadDictionaries"]),
	},
	components: {
		Card,
	},
})
export default class People extends Vue {
	people!: ILooseObject[];

	peopleCount!: number;

	dictionaries!: ILooseObject;

	loadPeople!: (page: number) => Promise<void>;

	loadDictionaries!: () => Promise<void>;

	get currentPage(): number {
		return Number(this.$route.query?.page) || 1;
	}

	created(): void {
		this.loadDictionaries();
		this.load();
	}

	async load(): Promise<void> {
		this.$store.commit("showLoader");
		this.loadPeople(this.currentPage).finally(() => {
			this.$store.commit("hideLoader");
		});
	}

	get pagesCount(): number {
		let num = Math.floor(this.peopleCount / PER_PAGE);
		if (this.peopleCount % PER_PAGE) {
			num += 1;
		}
		return num;
	}

	pageChanged(value: number): void {
		this.$router
			.push({
				name: PeopleRouteNames.List,
				query: value > 1 ? { page: value.toString() } : undefined,
			})
			.then(() => {
				this.load();
			})
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			.catch(() => {});
	}
}
</script>
