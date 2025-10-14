import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../core/services/movie.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie: any;
  videos: any[] = [];
  credits: any;
  isFavorite = false;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private favoritesService: FavoritesService,
    private notify: NotificationService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadMovie(id);
    }
  }

  loadMovie(id: number) {
    this.loading = true;
    this.errorMessage = '';

    this.movieService.getMovieDetails(id).subscribe({
      next: (data: any) => {
        this.movie = data;
        this.isFavorite = this.favoritesService.isFavorite(id);
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'Falha ao carregar informações do filme.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  toggleFavorite() {
    if (!this.movie) return;

    if (this.isFavorite) {
      this.favoritesService.remove(this.movie.id);
      this.isFavorite = false;
      this.notify.show('Filme removido dos favoritos.', 'success');
    } else {
      this.favoritesService.add(this.movie);
      this.isFavorite = true;
      this.notify.show('Filme adicionado aos favoritos!', 'success');
    }
  }

  get trailerUrl() {
    const trailer = this.movie?.videos?.results?.find(
      (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
    );
    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
  }
}
