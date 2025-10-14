import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${environment.accessToken}`,
      accept: 'application/json'
    });
  }

  private getParams(extra?: any): HttpParams {
    let params = new HttpParams().set('language', environment.defaultLanguage);
    if (extra) {
      Object.entries(extra).forEach(([k, v]) => params = params.set(k, v as string));
    }
    return params;
  }

  getPopularMovies(page = 1) {
    return this.http.get(`${this.baseUrl}/movie/popular`, {
      headers: this.getHeaders(),
      params: this.getParams({ page })
    }).pipe(catchError(err => this.handleError(err)));
  }

  getTopRatedMovies(page = 1) {
    return this.http.get(`${this.baseUrl}/movie/top_rated`, {
      headers: this.getHeaders(),
      params: this.getParams({ page })
    }).pipe(catchError(err => this.handleError(err)));
  }

  getNowPlaying(page = 1) {
    return this.http.get(`${this.baseUrl}/movie/now_playing`, {
      headers: this.getHeaders(),
      params: this.getParams({ page })
    }).pipe(catchError(err => this.handleError(err)));
  }

  getMovieDetails(id: number) {
    return this.http.get(`${this.baseUrl}/movie/${id}`, {
      headers: this.getHeaders(),
      params: this.getParams({ append_to_response: 'videos,credits' })
    }).pipe(catchError(err => this.handleError(err)));
  }

  searchMovies(query: string) {
    if (query.trim().length < 3)
      return throwError(() => new Error('A busca deve conter ao menos 3 caracteres'));

    return this.http.get(`${this.baseUrl}/search/movie`, {
      headers: this.getHeaders(),
      params: this.getParams({ query })
    }).pipe(catchError(err => this.handleError(err)));
  }

  private handleError(err: any) {
    if (err.status === 401) {
      alert('Erro 401: Token inválido ou expirado. Verifique suas credenciais.');
    } else if (err.status === 404) {
      alert('Recurso não encontrado.');
    } else {
      alert('Erro ao comunicar com o TMDb.');
    }
    return throwError(() => err);
  }
}
