import { Getters, Mutations, Actions, Module, createMapper } from "vuex-smart-module";
import { AUTHORIZATION_HEADER_VALUE, MOVIE_REQUEST_URL, METHODS_REQUEST } from "@/assets/ts/constants";
import { nanoid } from "nanoid";
import { IMovieEntity } from "@/types";

class MoviesState {
  movies: IMovieEntity[] = [];
}

class MoviesGetters extends Getters<MoviesState> {}

class MoviesMutations extends Mutations<MoviesState> {
  setMoviesValue(payload: IMovieEntity[]) {
    this.state.movies = payload;
  }
}

class MoviesActions extends Actions<MoviesState, MoviesGetters, MoviesMutations, MoviesActions> {
  async getMovies(): Promise<void> {
    const headers = new Headers({
      authorization: `${AUTHORIZATION_HEADER_VALUE} ${nanoid(15)}`,
    });
    try {
      const url = `${MOVIE_REQUEST_URL}/movies`;
      const response = await fetch(url, {
        method: METHODS_REQUEST.get,
        headers,
      });

      const moviesList: IMovieEntity[] = await response.json();

      this.mutations.setMoviesValue(moviesList);
    } catch (e) {
      const errorData = await e.json();
      throw new Error(`Error: ${errorData}`);
    }
  }
}

export const moviesModule = new Module({
  state: MoviesState,
  getters: MoviesGetters,
  mutations: MoviesMutations,
  actions: MoviesActions,
});

export const moviesMapper = createMapper(moviesModule);
