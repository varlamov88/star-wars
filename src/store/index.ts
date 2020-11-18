import Vue from "vue";
import Vuex from "vuex";
import people from "@/modules/people/store";
import { ILooseObject } from "@/interfaces";

Vue.use(Vuex);

interface ISnackBar {
	color: string;
	text: string;
}

export default new Vuex.Store({
	state: {
		isLoaderVisible: false,
		snackBar: {
			visible: false,
			color: undefined,
			text: "",
		},
	},
	mutations: {
		showLoader(state: ILooseObject) {
			state.isLoaderVisible = true;
		},
		hideLoader(state: ILooseObject) {
			state.isLoaderVisible = false;
		},
		showSnackBar(state: ILooseObject, payload: ISnackBar) {
			state.snackBar = { visible: true, ...payload };
		},
		hideSnackBar(state: ILooseObject, payload: ISnackBar) {
			state.snackBar = { visible: false, ...payload };
		},
	},
	actions: {},
	modules: {
		people,
	},
});
