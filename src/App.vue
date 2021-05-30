<template>
  <div id="app" class="app">
    <div class="app__header">
      <header-component />
    </div>
    <div id="nav" class="app__nav">
      <main-navigation />
    </div>
    <div class="app__main">
      <router-view />
    </div>
    <div class="app__footer">
      <footer-component />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeaderComponent from "@/components/HeaderComponent/index.vue";
import MainNavigation from "@/components/MainNavigation/index.vue";
import FooterComponent from "@/components/FooterComponent/index.vue";

@Component({
  components: {
    HeaderComponent,
    MainNavigation,
    FooterComponent,
  },
})
export default class Home extends Vue {}
</script>

<style>
@import "assets/scss/main.scss";
@import "assets/scss/normalize.scss";

.app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.app__main {
  height: 100%;
  flex-grow: 1;
}
</style>
