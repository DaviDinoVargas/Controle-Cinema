import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { NotificationService } from '../../core/services/notification.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { CommonModule, DatePipe, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DatePipe,
    SlicePipe
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  query: string = '';
  results: any[] = [];
  loading = false;

  constructor(
    private movieService: MovieService,
    private favoritesService: FavoritesService,
    private notify: NotificationService
  ) {}

  onSearchInput() {
    if (this.query.length < 3) {
      this.results = [];
      return;
    }

    this.loading = true;
    this.movieService.searchMovies(this.query).subscribe({
      next: (res: any) => {
        this.results = res.results || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notify.show('Erro ao buscar filmes.', 'error');
      }
    });
  }

  trackByMovieId(index: number, movie: any) {
    return movie.id;
  }

  addFavorite(movie: any) {
    if (this.favoritesService.isFavorite(movie.id)) {
      this.notify.show('Filme já está nos favoritos.', 'error');
    } else {
      this.favoritesService.add(movie);
      this.notify.show('Filme adicionado aos favoritos!', 'success');
    }
  }
}
