<template>
  <div class="main-page">
    <main-sorting />
    <section class="films">
      <film-list @button-click='buttonShowMoreClickHandler'>
        <template slot="header">
          <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
          <no-results />
        </template>
        <template slot="content">
          <film-card v-for="card in moviesList" :card="card" :key="`film-card-${card.id}`" />
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
import { Component, Vue, Mixins } from "vue-property-decorator";
import MainSorting from "@/components/MainSorting/index.vue";
import FilmList from "@/components/FilmList/index.vue";
import NoResults from "@/components/NoResults/index.vue";
import Loader from "@/components/Loader/index.vue";
import FilmCard from "@/components/FilmCard/index.vue";
import { moviesMapper } from "@/store/modules/movies";
import { IMovieEntity, IPaginationRequestPayload } from "@/types";

const Stored = Vue.extend({
  computed: moviesMapper.mapState(["movies", "paginationParamsDefault", "paginationParams"]),
  methods: moviesMapper.mapActions(["getMovies", "getPaginatedMovies"]),
});

@Component({
  components: {
    MainSorting,
    FilmList,
    NoResults,
    Loader,
    FilmCard,
  },
})
export default class Home extends Mixins(Stored) {
  public async mounted(): void {
    await this.getMovies();
    await this.getPaginatedMovies(this.paginationParamsDefault);
  }

  public buttonShowMoreClickHandler(): void {
    const payload: IPaginationRequestPayload = {
      limit: this.paginationParamsDefault.limit,
      start: this.paginationParamsDefault.start,
      end: this.paginationParams.end + this.paginationParamsDefault.limit,
    };

    this.getPaginatedMovies(payload);
  }

  public get moviesList(): IMovieEntity[] {
    return this.paginationParams.items;
  }
}
</script>
