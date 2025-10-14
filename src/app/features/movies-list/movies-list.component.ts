import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, SlicePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MovieService } from '../../core/services/movie.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, SlicePipe],
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  category = 'popular';
  currentPage = 1;
  totalPages = 1;
  loading = false;
  errorMessage = '';

  categories = [
    { key: 'popular', label: 'Populares' },
    { key: 'top_rated', label: 'Mais bem avaliados' },
    { key: 'now_playing', label: 'Em cartaz' },
    { key: 'upcoming', label: 'Em breve' }
  ];

  constructor(
    private movieService: MovieService,
    private favoritesService: FavoritesService,
    private notify: NotificationService
  ) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies(page: number = 1) {
    this.loading = true;
    this.errorMessage = '';

    this.movieService.getMovies(this.category, page).subscribe({
      next: (data: any) => {
        this.movies = data.results;
        this.totalPages = data.total_pages;
        this.currentPage = data.page;
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'Erro ao carregar filmes. Verifique sua conexão ou chave da API.';
      },
      complete: () => (this.loading = false)
    });
  }

  changeCategory(cat: string) {
    if (this.category !== cat) {
      this.category = cat;
      this.currentPage = 1;
      this.loadMovies();
    }
  }

  addFavorite(movie: any) {
    if (this.favoritesService.isFavorite(movie.id)) {
      this.notify.show('Filme já está nos favoritos.', 'error');
    } else {
      this.favoritesService.add(movie);
      this.notify.show('Filme adicionado aos favoritos!', 'success');
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadMovies(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.loadMovies(this.currentPage - 1);
    }
  }

  trackByMovieId(index: number, movie: any) {
    return movie.id;
  }
}
