<template>
  <article class="film-card">
    <h3 class="film-card__title">{{ movieTitle }}</h3>
    <p class="film-card__rating">{{ movieRating }}</p>
    <p class="film-card__info">
      <span class="film-card__year">{{ dateRelease }}</span>
      <span v-if="movieDuration" class="film-card__duration">{{ movieDuration }}</span>
      <span class="film-card__genre">{{ genreList }}</span>
    </p>
    <img :src="imgSource" alt="" class="film-card__poster" />
    <p class="film-card__description">{{ movieDescription }}</p>
    <!--  Todo добавить pluralization  -->
    <a class="film-card__comments">{{ movieQuantityComments }}</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { IOptions } from "./FilmCard.options";

@Component
export default class FilmCard extends Vue {
  @Prop({ required: true })
  public options: IOptions;

  public get movieTitle(): string {
    return this.options.card?.film_info?.title ?? "Неопознанный енот";
  }

  public get movieDescription(): string {
    if (!this.options.card?.film_info?.description?.length) {
      return "Упс. Кажется, описание фильма съела собака!";
    }
    return this.options.card?.film_info?.description?.length < 140 ? this.options.card?.film_info?.description : `${this.options.card?.film_info?.description?.slice(0, 140)}...`;
  }

  public get movieRating(): number {
    return this.options.card?.film_info?.total_rating ?? 0;
  }

  public get movieQuantityComments(): string {
    return this.options.card?.comments?.length ? `${this.options.card?.comments?.length} comments` : "No comments";
  }

  // Todo Продолжительность в формате часы минуты (например «1h 36m»);
  public get movieDuration(): string {
    return this.options.card?.film_info?.runtime ? this.options.card?.film_info?.runtime + " min." : "";
  }

  public get genreList(): string {
    return this.options.card?.film_info?.genre?.join(", ") ?? "";
  }

  // Todo исправить на формат мес/год **/****
  public get dateRelease(): string {
    return this.options.card?.film_info?.release?.date?.split("-")[0] ?? "";
  }

  public get imgSource(): string {
    return `${this.options.card?.film_info?.poster}`;
  }
}
</script>

<style lang="scss"></style>
