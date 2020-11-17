<template>
	<v-card v-if="people" class="card">
		<v-card-title>{{ people.name }}</v-card-title>

		<v-card-text>
			<v-row>
				<v-col>
					<div>
						Gender: <span class="font-weight-bold">{{ people.gender }}</span>
					</div>
					<div>
						Height: <span class="font-weight-bold">{{ people.height }}</span>
					</div>
					<div>
						Mass: <span class="font-weight-bold">{{ people.mass }}</span>
					</div>
				</v-col>
				<v-col>
					<div class="font-weight-bold">Starships:</div>

					<div>
						<template v-if="isExistStarships">
							<v-chip
								v-for="starship in people.starships"
								:key="starship"
								small
								color="primary"
								text-color="white"
								>{{ getStarshipName(starship) }}</v-chip
							>
						</template>
						<template v-else>
							<v-chip color="error" small text-color="white"
								>I haven't starship (</v-chip
							>
						</template>
					</div>
				</v-col>
			</v-row>
		</v-card-text>

		<v-divider class="mx-4 mt-auto"></v-divider>

		<v-card-actions class="py-4">
			<v-btn
				class="ml-auto"
				color="primary"
				right
				small
				@click="openDetail(people.url)"
				>See more info Person</v-btn
			>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ILooseObject } from "@/interfaces";
import { mapGetters } from "vuex";
import { namespace } from "../store";
import { PeopleRouteNames } from "../router";

@Component({
	computed: {
		...mapGetters(namespace, ["starshipsMap"]),
	},
})
export default class Card extends Vue {
	@Prop({ type: Object, required: true }) people!: ILooseObject;

	starshipsMap!: {
		[key: string]: ILooseObject;
	};

	get isExistStarships(): boolean {
		return !!(
			Array.isArray(this.people.starships) && this.people.starships.length
		);
	}

	getStarshipName(key: string): string | void {
		return this.starshipsMap[key]?.name;
	}

	openDetail(link: string): void {
		const re = /([\d]+)\/$/;
		const matches = link.match(re);
		if (!matches) return;

		this.$router
			.push({
				name: PeopleRouteNames.Detail,
				params: { id: matches[1] },
			})
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			.catch(() => {});
	}
}
</script>

<style lang="scss" scoped>
.card {
	height: 100%;
	display: flex;
	flex-direction: column;
}
</style>
