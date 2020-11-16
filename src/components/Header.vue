<template>
	<header class="header">
		<router-link :to="{ name: 'Home' }" class="header__link">
			<img src="../assets/logo.png" class="header__logo" />
		</router-link>
	</header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {}
</script>

<style scoped lang="scss">
.header {
	height: 65px;
	width: 100%;
	background-color: #000;
	background-image: url("../assets/header.jpg");
	background-size: cover;
	background-position: center;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	&__link {
		height: 35px;
	}
	&__logo {
		height: 100%;
	}
}
</style>
