import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private notify: NotificationService
  ) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favorites = this.favoritesService.getAll();
  }

  removeFavorite(id: number) {
    this.favoritesService.remove(id);
    this.notify.show('Filme removido dos favoritos.', 'success');
    this.loadFavorites();
  }

  clearAll() {
    if (confirm('Deseja remover todos os favoritos?')) {
      this.favoritesService.clear();
      this.loadFavorites();
      this.notify.show('Lista de favoritos limpa.', 'success');
    }
  }

  trackByMovieId(index: number, movie: any) {
    return movie.id;
  }
}
