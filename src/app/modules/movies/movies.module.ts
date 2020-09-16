import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviePosterComponent } from './components/movie-poster/movie-poster.component';
import { MoviesCategorySidebarComponent } from './components/movies-category-sidebar/movies-category-sidebar.component';
import { SpinnerComponent } from '@app/components/spinner/spinner.component';
import { SpinnerOverlayComponent } from '@app/components/spinner-overlay/spinner-overlay.component';

import { MoviesService } from './services/movies.service';
import { MoviesComponent } from './movies.component';


@NgModule({
  declarations: [
    MoviesListComponent,
    MovieDetailsComponent,
    MoviePosterComponent,
    MoviesCategorySidebarComponent,
    MoviesComponent,

    // move to shared module
    SpinnerComponent,
    SpinnerOverlayComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    HttpClientModule
  ],
  providers: [
    MoviesService,
  ]
})
export class MoviesModule { }
