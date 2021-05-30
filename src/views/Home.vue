<template>
  <div class="main-page">
    <main-sorting />
    <section class="films">
      <film-list>
        <template slot="header">
          <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
          <no-results />
        </template>
        <template slot="content">
          <film-card />
          <film-card />
          <film-card />
          <film-card />
          <film-card />
        </template>
      </film-list>

      <film-list is-extra>
        <template slot="header">
          <h2 class="films-list__title">Top rated</h2>
        </template>
        <template slot="content">
          <film-card />
          <film-card />
        </template>
      </film-list>

      <film-list is-extra>
        <template slot="header">
          <h2 class="films-list__title">Most commented</h2>
        </template>
        <template slot="content">
          <film-card />
          <film-card />
        </template>
      </film-list>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MainSorting from "@/components/MainSorting/index.vue";
import FilmList from "@/components/FilmList/index.vue";
import NoResults from "@/components/NoResults/index.vue";
import Loader from "@/components/Loader/index.vue";
import FilmCard from "@/components/FilmCard/index.vue";

@Component({
  components: {
    MainSorting,
    FilmList,
    NoResults,
    Loader,
    FilmCard,
  },
})
export default class Home extends Vue {}
</script>
