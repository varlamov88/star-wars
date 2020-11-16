import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/",
		name: "Home",
		redirect: { name: "People" },
	},
	{
		path: "/people",
		name: "People",
		component: () => import(/* webpackChunkName: "people" */ "../modules/people/People.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
