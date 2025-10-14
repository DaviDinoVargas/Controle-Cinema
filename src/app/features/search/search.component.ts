import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { FavoritesService } from 'src/app/core/services/favorites.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  query = '';
  results: any[] = [];
  private searchTerms = new Subject<string>();
  loading = false;

  constructor(
    private movieService: MovieService,
    private notify: NotificationService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => {
        const q = term.trim();
        if (q.length < 3) {
          this.results = [];
          return of(null);
        }
        this.loading = true;
        return this.movieService.searchMovies(q);
      })
    ).subscribe({
      next: (res: any | null) => {
        this.loading = false;
        if (res) {
          this.results = res.results;
        }
      },
      error: err => {
        console.error(err);
        this.loading = false;
        this.notify.show('Erro ao buscar filmes.', 'error');
      }
    });
  }

  onSearchInput(): void {
    this.searchTerms.next(this.query);
  }

  addFavorite(movie: any) {
    if (this.favoritesService.isFavorite(movie.id)) {
      this.notify.show('Filme já está nos favoritos.', 'info');
    } else {
      this.favoritesService.add(movie);
      this.notify.show('Filme adicionado aos favoritos!', 'success');
    }
  }

  trackByMovieId(index: number, movie: any) {
    return movie.id;
  }
}
