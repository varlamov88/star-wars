import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import PeopleRouter from "../modules/people/router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/",
		name: "Home",
		redirect: { name: "People" },
	},
	...PeopleRouter,
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
