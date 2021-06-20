<template>
  <div class="main-page">
    <main-sorting />
    <section class="films">
      <film-list :options="filmListMainOptions">
        <template slot="header">
          <h2 v-if="shouldShowTitle" class="films-list__title visually-hidden">All movies. Upcoming</h2>
          <no-results v-if="shouldShowNoResults" />
          <loader v-if="loading" />
        </template>

        <button-component v-if="shouldShowButton" @click.native="buttonShowMoreClickHandler" slot="button">Show more</button-component>
      </film-list>

      <film-list :options="filmListTopRatedOptions">
        <template slot="header">
          <h2 class="films-list__title">Top rated</h2>
        </template>
      </film-list>

      <film-list :options="filmListMostCommentedOptions">
        <template slot="header">
          <h2 class="films-list__title">Most commented</h2>
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
import ButtonComponent from "@/components/ButtonComponent/index.vue";
import { moviesMapper } from "@/store/modules/movies";
import { IPaginationRequestPayload } from "@/types";
import { IMovieEntity } from "@/components/FilmCard/FilmCard.types";
import { IOptions } from "@/components/FilmList/FilmList.options";

const Stored = Vue.extend({
  computed: moviesMapper.mapState(["movies", "paginationParamsDefault", "paginationParams", "loading"]),
  methods: moviesMapper.mapActions(["getMovies", "getPaginatedMovies"]),
});

@Component({
  components: {
    MainSorting,
    FilmList,
    NoResults,
    Loader,
    ButtonComponent,
  },
})
export default class Home extends Mixins(Stored) {
  public async mounted(): Promise<void> {
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

  public get filmListMainOptions(): IOptions {
    return {
      isExtra: false,
      movies: this.moviesList,
    };
  }

  public get filmListMostCommentedOptions(): IOptions {
    return {
      isExtra: true,
      movies: this.moviesListMostCommented,
    };
  }

  public get filmListTopRatedOptions(): IOptions {
    return {
      isExtra: true,
      movies: this.moviesListTopRated.slice(0, 2),
    };
  }

  public get moviesListMostCommented(): IMovieEntity[] {
    const moviesCopy = this.movies.slice();
    moviesCopy.sort((a: IMovieEntity, b: IMovieEntity) => {
      return b.comments?.length - a.comments?.length;
    });

    return moviesCopy.slice(0, 2);
  }

  public get moviesListTopRated(): IMovieEntity[] {
    const moviesCopy = this.movies.slice();
    moviesCopy.sort((a: IMovieEntity, b: IMovieEntity) => {
      return b.film_info?.total_rating - a.film_info?.total_rating;
    });

    return moviesCopy.slice(0, 2);
  }

  public get shouldShowButton(): boolean {
    return this.movies > this.moviesList;
  }

  public get shouldShowTitle(): boolean {
    return Boolean(this.moviesList.length && !this.loading);
  }

  public get shouldShowNoResults(): boolean {
    return Boolean(!this.moviesList.length && !this.loading);
  }
}
</script>
