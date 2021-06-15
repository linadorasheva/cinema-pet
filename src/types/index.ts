export interface IReleaseData {
  date?: string;
  release_country?: string;
}

export interface IFilmInfo {
  actors?: string[];
  age_rating?: number;
  alternative_title?: string;
  description?: string;
  director?: string;
  genre?: string[];
  poster?: string;
  release?: IReleaseData;
  runtime?: number;
  title?: string;
  total_rating?: number;
}

export interface IUserDetails {
  already_watched?: boolean;
  favorite?: boolean;
  watching_date?: string;
  watchlist?: boolean;
}

export interface IMovieEntity {
  comments?: string[];
  film_info?: IFilmInfo;
  id?: string;
  user_details?: IUserDetails;
}

export interface IPaginationRequestPayload {
  limit?: number;
  start?: number;
  end: number;
}
