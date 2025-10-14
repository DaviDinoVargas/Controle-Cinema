import { Routes } from '@angular/router';

import { MovieListComponent } from './features/movies-list/movies-list.component';
import { MovieDetailComponent } from './features/movie-detail/movie-detail.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { SearchComponent } from './features/search/search.component';

export const routes: Routes = [
  { path: '', redirectTo: 'movies/popular', pathMatch: 'full' },
  { path: 'movies/:category', component: MovieListComponent },
  { path: 'filme/:id', component: MovieDetailComponent },
  { path: 'favoritos', component: FavoritesComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', redirectTo: 'movies/popular' }
];
