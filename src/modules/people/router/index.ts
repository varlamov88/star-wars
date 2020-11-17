// eslint-disable-next-line
export enum PeopleRouteNames {
	List = "People",
	Detail = "PeopleDetail",
}

export default [
	{
		path: "/people",
		name: PeopleRouteNames.List,
		component: (): Promise<typeof import("*.vue")> => import(/* webpackChunkName: "people" */ "../People.vue"),
	},
	{
		path: "/people/:id",
		name: PeopleRouteNames.Detail,
		// prettier-ignore
		component: (): Promise<typeof import("*.vue")> => import(/* webpackChunkName: "people-detail" */ "../PeopleDetail.vue"),
		props: true,
	},
];
