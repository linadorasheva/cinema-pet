<template>
  <section class="film-details">
    <form class="film-details__inner">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button" @click="closeModal">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" :src="imgSource" :alt="mainTitle" />

            <p class="film-details__age">{{ ageRating }}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">{{ mainTitle }}</h3>
                <p class="film-details__title-original">Original: {{ alternativeTitle }}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">{{ rating }}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">{{ director }}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">{{ listWriters }}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">{{ listActors }}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">{{ dateRelease }}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">{{ movieDuration }}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">{{ countryRelease }}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">{{ genresTitle }}</td>
                <td class="film-details__cell">
                  <span v-for="(genre, index) in genres" :key="`film-details-genre-${index}`" class="film-details__genre">{{ genre }}</span>
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">
              {{ fullDescription }}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" />
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" />
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" />
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">
            Comments: <span class="film-details__comments-count">{{ movieQuantityComments }}</span>
          </h3>

          <ul class="film-details__comments-list">
            <li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="@/assets/images/emoji/smile.png" width="55" height="55" alt="emoji-smile" />
              </span>
              <div>
                <p class="film-details__comment-text">Interesting setting and a good cast</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">Tim Macoveev</span>
                  <span class="film-details__comment-day">2019/12/31 23:59</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>
            <li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="@/assets/images/emoji/sleeping.png" width="55" height="55" alt="emoji-sleeping" />
              </span>
              <div>
                <p class="film-details__comment-text">Booooooooooring</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">John Doe</span>
                  <span class="film-details__comment-day">2 days ago</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>
            <li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="@/assets/images/emoji/puke.png" width="55" height="55" alt="emoji-puke" />
              </span>
              <div>
                <p class="film-details__comment-text">Very very old. Meh</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">John Doe</span>
                  <span class="film-details__comment-day">2 days ago</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>
            <li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="@/assets/images/emoji/angry.png" width="55" height="55" alt="emoji-angry" />
              </span>
              <div>
                <p class="film-details__comment-text">Almost two hours? Seriously?</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">John Doe</span>
                  <span class="film-details__comment-day">Today</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label" />

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" />
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" />
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="@/assets/images/emoji/smile.png" width="30" height="30" alt="emoji" />
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" />
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="@/assets/images/emoji/sleeping.png" width="30" height="30" alt="emoji" />
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" />
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="@/assets/images/emoji/puke.png" width="30" height="30" alt="emoji" />
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" />
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="@/assets/images/emoji/angry.png" width="30" height="30" alt="emoji" />
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { IOptions } from "./MoviePopupContent.options";

const NO_DATA = "";

@Component
export default class MoviePopupContent extends Vue {
  @Prop({ required: true })
  options!: IOptions;

  public get ageRating(): string {
    return this.options.card?.film_info.age_rating ? `+${this.options.card.film_info.age_rating}` : NO_DATA;
  }

  public get mainTitle(): string {
    return this.options.card.film_info.title;
  }

  public get alternativeTitle(): string {
    return this.options.card.film_info.alternative_title ?? NO_DATA;
  }

  public get rating(): number {
    return this.options.card?.film_info.total_rating ?? 0;
  }

  public get fullDescription(): string {
    return this.options.card.film_info.description;
  }

  public get director(): string {
    return this.options.card.film_info.director;
  }

  public get listWriters(): string {
    return this.options.card.film_info.writers.join(", ");
  }

  public get listActors(): string {
    return this.options.card.film_info.actors.join(", ");
  }

  // Todo исправить на формат мес/год **/****
  public get dateRelease(): string {
    return this.options.card.film_info.release.date.split("-")[0] ?? "";
  }

  public get countryRelease(): string {
    return this.options.card.film_info.release.release_country ?? "";
  }

  public get imgSource(): string {
    return `${this.options.card.film_info.poster}`;
  }

  // Todo Продолжительность в формате часы минуты (например «1h 36m»);
  public get movieDuration(): string {
    return this.options.card.film_info.runtime ? this.options.card.film_info.runtime + " min." : "";
  }

  public get genres(): string[] {
    return this.options.card.film_info.genre ?? [];
  }

  public get genresTitle(): string {
    return this.options.card.film_info.genre.length > 1 ? "Genres" : "Genre";
  }

  public get movieQuantityComments(): string {
    return this.options.card.comments.length ? `${this.options.card.comments.length} comments` : "No comments";
  }

  @Emit("close")
  public closeModal(): string {
    return "close";
  }
}
</script>
