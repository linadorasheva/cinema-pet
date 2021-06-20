import { IMovieEntity } from "@/components/FilmCard/FilmCard.types";

export interface IOptions {
  isExtra: boolean,
  movies: IMovieEntity[],
}
