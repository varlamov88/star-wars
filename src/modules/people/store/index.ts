import axios from "axios";

export const namespace = "people";
export default {
	namespaced: true,
	state: {
		people: [],
		a: 5,
	},
	mutetions: {

	},
	actions: {
		load(context) {
			axios.get("https://swapi.dev/api/people/")
				.then((response) => {
					// handle success
					console.log(1, response);
				})
				.catch((error) => {
					// handle error
					console.log(2, error);
				});
		},
	},
};
