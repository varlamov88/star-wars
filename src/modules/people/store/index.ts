import axios from "axios";
import { API_URL } from "@/config";
import { ILooseObject } from "@/interfaces";
import { IPeople } from '../interfaces';

interface IResponse {
	data: {
		count: number;
		next: string;
		results: ILooseObject[];
	};
}

export interface IDictionaries {
	starships: ILooseObject[],
	films: ILooseObject[],
}

async function getAllPages(response: IResponse): Promise<ILooseObject[]> {
	if (!response?.data?.results) return [];

	const arr = response.data.results;

	if (response.data.next) {
		await axios.get(response.data.next).then(async (res) => {
			arr.push(...(await getAllPages(res)));
		});
	}
	return arr;
}

export const namespace = "people";
export default {
	namespaced: true,
	state: {
		people: [],
		peopleCount: null,
		dictionaries: {
			starships: [],
			films: [],
		} as IDictionaries,
	},
	getters: {
		starshipsMap(state: ILooseObject): ILooseObject {
			const map: ILooseObject = {};
			// eslint-disable-next-line
			for (const starhip of state.dictionaries.starships) {
				map[starhip.url] = starhip;
			}
			return map;
		},
		filmsMap(state: ILooseObject): ILooseObject {
			const map: ILooseObject = {};
			// eslint-disable-next-line
			for (const film of state.dictionaries.films) {
				map[film.url] = film;
			}
			return map;
		},
	},
	mutations: {
		setPeopleCount(state: ILooseObject, payload: number): void {
			state.peopleCount = payload;
		},
		loadPeople(state: ILooseObject, payload: ILooseObject[]): void {
			state.people = payload;
		},
		loadStarships(state: ILooseObject, payload: ILooseObject[]): void {
			state.dictionaries.starships = payload;
		},
		loadFilms(state: ILooseObject, payload: ILooseObject[]): void {
			state.dictionaries.films = payload;
		},
	},
	actions: {
		loadPeople: {
			handler: async (context: ILooseObject, page = 1): Promise<void> => {
				axios
					.get(`${API_URL}/people/?page=${page}`)
					.then((response: IResponse) => {
						context.commit("setPeopleCount", response.data.count);
						context.commit("loadPeople", response.data.results);
					})
					.catch(() => {
						// TODO: handle error
					});
			},
		},
		loadDictionaries: {
			handler: async (context: ILooseObject): Promise<void> => {
				const list: { name: string; mutationName: string }[] = [
					{ name: "starships", mutationName: "loadStarships" },
					{ name: "films", mutationName: "loadFilms" },
				];

				const promises = list.map(async (item) => {
					const response = await axios.get(`${API_URL}/${item.name}/`);
					const allRecords = await getAllPages(response);
					context.commit(item.mutationName, allRecords);
				});

				await Promise.all(promises).catch((e) => {
					// TODO: //
					throw new Error(e);
				});
			},
		},
		requestPeopleById: {
			handler: async (_context: ILooseObject, id: number): Promise<IPeople> => {
				const people = await axios.get(`${API_URL}/people/${id}/`) as IPeople;
				return people;
			},
		},
	},
};
