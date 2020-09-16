import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviesComponent } from './movies.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    children: [
      {
        path: '',
        component: MoviesListComponent,
      },
      {
        path: 'category/:categoryId',
        component: MoviesListComponent,
      },
      {
        path: 'category/:categoryId/details/:movieId',
        component: MovieDetailsComponent
      },
      {
        path: 'details/:movieId',
        component: MovieDetailsComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
