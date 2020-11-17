import Vue from "vue";
import Vuex from "vuex";
import people from "@/modules/people/store";
import { ILooseObject } from "@/interfaces";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLoaderVisible: false,
	},
	mutations: {
		showLoader(state: ILooseObject) {
			state.isLoaderVisible = true;
		},
		hideLoader(state: ILooseObject) {
			state.isLoaderVisible = false;
		},
	},
	actions: {},
	modules: {
		people,
	},
});
