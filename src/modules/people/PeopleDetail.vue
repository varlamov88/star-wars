<template>
	<v-container v-if="Object.keys(people).length">
		<v-row>
			<v-col>
				<v-row>
					<v-col>
						<h2>{{ people.name }}</h2>
					</v-col>
					<v-col>
						<v-btn
							class="ml-auto"
							color="success"
							right
							small
							@click="backToList"
							>Back to List</v-btn
						>
					</v-col>
				</v-row>

				<v-divider />

				<div class="py-2">
					<v-row>
						<v-col>
							<v-list color="cyan" flat class="pa-0">
								<!-- <v-list-item-group v-for="(prop, i) in propsList" :key="i"> -->
								<v-list-item v-for="(prop, i) in propsList" :key="i">
									<template #default>
										<v-list-item-content>
											<v-list-item-title
												>{{ prop.text }}:
												<span class="font-weight-bold">{{
													prop.value
												}}</span></v-list-item-title
											>
										</v-list-item-content>
									</template>
								</v-list-item>
								<!-- </v-list-item-group> -->
							</v-list>
						</v-col>

						<v-col>
							<h4>Films</h4>
							<template v-if="isExistFilms">
								<v-chip
									v-for="film in people.films"
									:key="film"
									small
									color="primary"
									text-color="white"
									>{{ getFilmName(film) }}</v-chip
								>
							</template>
							<template v-else>
								<v-chip color="error" small text-color="white"
									>I'm not an a actor (</v-chip
								>
							</template>
						</v-col>
					</v-row>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import { ILooseObject } from "@/interfaces";
import { Route } from "vue-router";
import { namespace } from "./store";
import { IPeople } from "./interfaces";
import { PeopleRouteNames } from "./router";

@Component({
	computed: {
		...mapGetters(namespace, ["filmsMap"]),
	},
	methods: {
		...mapActions(namespace, ["requestPeopleById", "loadDictionaries"]),
	},
	components: {},
})
export default class PeopleDetail extends Vue {
	@Prop({ type: String, required: true }) id!: string;

	requestPeopleById!: (id: number) => Promise<ILooseObject>;

	loadDictionaries!: () => Promise<void>;

	people: IPeople | ILooseObject = {};

	filmsMap!: {
		[key: string]: ILooseObject;
	};

	get isExistFilms(): boolean {
		return !!(Array.isArray(this.people.films) && this.people.films.length);
	}

	getFilmName(key: string): string | void {
		return this.filmsMap[key]?.title;
	}

	created(): void {
		this.loadDictionaries();
		this.$store.commit("showLoader");

		this.requestPeopleById(Number(this.id))
			.then((response) => {
				this.people = response.data;
			})
			.finally(() => {
				this.$store.commit("hideLoader");
			});
	}

	get propsList(): { text: string; value: string }[] {
		return [
			{
				text: "Birth Year",
				value: this.people.birth_year,
			},
			{
				text: "Gender",
				value: this.people.gender,
			},
			{
				text: "Height",
				value: this.people.height,
			},
			{
				text: "Mass",
				value: this.people.mass,
			},
			{
				text: "Hair Color",
				value: this.people.hair_color,
			},
			{
				text: "Skin Color",
				value: this.people.skin_color,
			},
			{
				text: "Eye Color",
				value: this.people.eye_color,
			},
		];
	}

	previosRoute: Route | null = null;

	// eslint-disable-next-line class-methods-use-this
	beforeRouteEnter(
		to: Route,
		from: Route,
		next: (arg0: (vm: ILooseObject) => void) => void,
	): void {
		next((vm) => {
			// eslint-disable-next-line no-param-reassign
			vm.previosRoute = from;
		});
	}

	backToList(): void {
		if (this.previosRoute?.name === PeopleRouteNames.List) {
			this.$router.go(-1);
		}
		this.$router
			.push({
				name: PeopleRouteNames.List,
			})
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			.catch(() => {});
	}
}
</script>
