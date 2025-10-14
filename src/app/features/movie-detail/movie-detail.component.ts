import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/core/services/movie.service';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-movie-detail',
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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMovie(+id);
    }
  }

  async loadMovie(id: number) {
    this.loading = true;
    this.errorMessage = '';

    try {
      this.movie = await this.movieService.getMovieDetails(id);
      this.videos = await this.movieService.getMovieVideos(id);
      this.credits = await this.movieService.getMovieCredits(id);

      this.isFavorite = this.favoritesService.isFavorite(id);
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Falha ao carregar informações do filme.';
    } finally {
      this.loading = false;
    }
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
    const trailer = this.videos.find(v => v.type === 'Trailer' && v.site === 'YouTube');
    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
  }
}
