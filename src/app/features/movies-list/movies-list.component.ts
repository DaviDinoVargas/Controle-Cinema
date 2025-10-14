import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
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

  async loadMovies(page: number = 1) {
    this.loading = true;
    this.errorMessage = '';

    try {
      const data = await this.movieService.getMovies(this.category, page);
      this.movies = data.results;
      this.totalPages = data.total_pages;
      this.currentPage = data.page;
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Erro ao carregar filmes. Verifique sua conexão ou chave da API.';
    } finally {
      this.loading = false;
    }
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
      this.notify.show('Filme já está nos favoritos.', 'info');
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
