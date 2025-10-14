import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private key = 'favorites';

  getAll(): any[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  add(movie: any) {
    const list = this.getAll();
    if (list.some(x => x.id === movie.id)) return;
    list.push(movie);
    localStorage.setItem(this.key, JSON.stringify(list));
  }

  remove(id: number) {
    const list = this.getAll().filter(x => x.id !== id);
    localStorage.setItem(this.key, JSON.stringify(list));
  }

  isFavorite(id: number): boolean {
    return this.getAll().some(x => x.id === id);
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}
