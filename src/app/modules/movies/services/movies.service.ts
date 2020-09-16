import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MoviesService {
  genresPath = '/genre/movie/list';
  movieListPath = '/discover/movie?with_genres';
  moviePath = '/movie';
  apiPath = environment.api_path;
  apiKey = environment.api_key;

  constructor(private http: HttpClient) {}

  getMoviesGenres(): Observable<any> {
    return this.http.get(
      `${this.apiPath}${this.genresPath}?api_key=${this.apiKey}`
    );
  }

  getMoviesByGenreId(id, i): Observable<any> {
    return this.http.get(
      `${this.apiPath}${this.movieListPath}?with_genres=${id}&api_key=${this.apiKey}&page=${i}`
    );
  }

  getMovieById(id): Observable<any> {
    return this.http.get(
      `${this.apiPath}${this.moviePath}/${id}?api_key=${this.apiKey}`
    );
  }

}
