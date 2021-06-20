import { Getters, Actions, Module, createMapper } from "vuex-smart-module";
import { AUTHORIZATION_HEADER_VALUE, MOVIE_REQUEST_URL, METHODS_REQUEST } from "@/assets/ts/constants";
import { nanoid } from "nanoid";
import { IPaginationRequestPayload } from "@/types";
import { IMovieEntity } from "@/components/FilmCard/FilmCard.types";
import { ExtendedMutations } from "@/utils/extended-mutations";

interface IPaginationParams {
  items: IMovieEntity[];
  limit: number;
  start: number;
  end: number;
}

class MoviesState {
  movies: IMovieEntity[] = [];
  loading = false;

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
    this.mutations.mutate({
      loading: true,
    });
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

      this.mutations.mutate({
        movies: moviesList,
        loading: false,
      });
    } catch (e) {
      const errorData = await e.json();
      throw new Error(`Error: ${errorData}`);
    }
  }

  public getPaginatedMovies(payload: IPaginationRequestPayload): void {
    this.mutations.mutate({
      loading: true,
    });
    const moviesCopy = this.state.movies.slice();
    const result = moviesCopy.slice(payload.start, payload.end);
    this.mutations.mutate({
      paginationParams: {
        items: result,
        limit: this.state.paginationParams.limit,
        start: this.state.paginationParams.start,
        end: payload.end,
      },
      loading: false,
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
