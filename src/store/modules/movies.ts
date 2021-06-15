import { Getters, Actions, Module, createMapper } from "vuex-smart-module";
import { AUTHORIZATION_HEADER_VALUE, MOVIE_REQUEST_URL, METHODS_REQUEST } from "@/assets/ts/constants";
import { nanoid } from "nanoid";
import { IMovieEntity, IPaginationRequestPayload } from "@/types";
import { ExtendedMutations } from "@/utils/extended-mutations";

interface IPaginationParams {
  items: IMovieEntity[];
  limit: number;
  start: number;
  end: number;
}

class MoviesState {
  movies: IMovieEntity[] = [];

  paginationParams: IPaginationParams = {
    items: [],
    limit: 5,
    start: 0,
    end: 5,
  };

  paginationParamsDefault: IPaginationParams = {
    items: [],
    limit: 5,
    start: 0,
    end: 5,
  };
}

class MoviesGetters extends Getters<MoviesState> {}

class MoviesMutations extends ExtendedMutations<MoviesState> {
  setMoviesValue(payload: IMovieEntity[]): void {
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

  public getPaginatedMovies(payload: IPaginationRequestPayload): void {
    const moviesCopy = this.state.movies.slice();
    const result = moviesCopy.slice(payload.start, payload.end);
    this.mutations.mutate({
      paginationParams: {
        items: result,
        limit: this.state.paginationParams.limit,
        start: this.state.paginationParams.start,
        end: payload.end,
      },
    });
  }
}

export const moviesModule = new Module({
  state: MoviesState,
  getters: MoviesGetters,
  mutations: MoviesMutations,
  actions: MoviesActions,
});

export const moviesMapper = createMapper(moviesModule);
