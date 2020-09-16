import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
// Components
import { AbstractKeypressComponent } from '@app/modules/movies/components/abstract.keypress';
// Services
import { MoviesService } from '@modules/movies/services/movies.service';
import { KeyNavService, Focusable } from '@app/services/key-navigation.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent extends AbstractKeypressComponent implements OnInit, OnDestroy {
  componentId = Focusable.moviesList;
  movies = [];
  subscriptions: Subscription[] = [];
  loader = true;
  currentMovie = 0;

  public keyActions: {[key: string]: () => void} = {
    'k--KeyA': () => {
      this.navigateLeft();
    },
    'k--ArrowLeft': () => {
      this.navigateLeft();
    },
    'k--KeyD': () => {
      this.navigateRight();
    },
    'k--ArrowRight': () => {
      this.navigateRight();
    },
    'k--KeyB': () => {
      this.keyService.focusSidebar();
    },
    'k--Enter': () => {
      this.openMovieDetails(this.movies[this.currentMovie]);
    },
  };

  constructor(
    private moviesService: MoviesService,
    private keyService: KeyNavService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    super(keyService, router);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.subscriptions.push(this.route.params.subscribe(data => {
      this.changeCategoryHandler(data.categoryId);
    }));
  }

  public openMovieDetails(movie: any): void {
    this.router.navigate([`${this.router.url}/details/`, movie.id]);
    this.keyService.focusMovieDetail();
  }

  private changeCategoryHandler(id: number): void {
    this.getMoviesList(id, 1);
    this.currentMovie = 0;
  }

  private getMoviesList(id: number, page: number): void {
    this.loader = true;
    this.moviesService.getMoviesByGenreId(id, page).subscribe(data => {
      this.movies = data.results;
      this.loader = false;
    }, error => {
      this.loader = false;
    });
  }

  private navigateRight(): void {
    if (this.currentMovie + 1 < this.movies.length) {
      this.currentMovie += 1;
    }
  }

  private navigateLeft(): void {
    if (this.currentMovie > 0) {
      this.currentMovie -= 1;
    } else {
      this.keyService.focusSidebar();
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
