// eslint-disable-next-line
export enum PeopleRouteNames {
	List = "People",
	Detail = "PeopleDetail",
}

export default [
	{
		path: "/people",
		name: PeopleRouteNames.List,
		component: () => import(/* webpackChunkName: "people" */ "../People.vue"),
	},
	{
		path: "/people/:id",
		name: PeopleRouteNames.Detail,
		// prettier-ignore
		component: () => import(/* webpackChunkName: "people-detail" */ "../PeopleDetail.vue"),
		props: true,
	},
];
