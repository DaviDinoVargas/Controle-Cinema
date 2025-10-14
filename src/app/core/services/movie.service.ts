import { Injectable } from '@angular/core';
import { TmdbService } from './tmdb.service';

@Injectable({ providedIn: 'root' })
export class MovieService {
  constructor(private tmdb: TmdbService) {}

  getMovies(category: string, page = 1) {
    switch (category) {
      case 'popular': return this.tmdb.getPopularMovies(page);
      case 'top_rated': return this.tmdb.getTopRatedMovies(page);
      case 'now_playing': return this.tmdb.getNowPlaying(page);
      default: return this.tmdb.getPopularMovies(page);
    }
  }

  getMovieDetails(id: number) {
    return this.tmdb.getMovieDetails(id);
  }

  searchMovies(query: string) {
    return this.tmdb.searchMovies(query);
  }
}
