import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { combineLatest, Subscription } from 'rxjs';
// Components
import { AbstractKeypressComponent } from '@modules/movies/components/abstract.keypress';
// Services
import { MoviesService } from '@modules/movies/services/movies.service';
import { KeyNavService, Focusable } from '@app/services/key-navigation.service';


@Component({
  selector: 'app-movies-category-sidebar',
  templateUrl: './movies-category-sidebar.component.html',
  styleUrls: ['./movies-category-sidebar.component.scss']
})
export class MoviesCategorySidebarComponent extends AbstractKeypressComponent implements OnDestroy {
  componentId: string = Focusable.sidebar;
  categories = [];
  current: number;
  subscriptions: Subscription[] = [];
  routeCategoryId: number;
  routeMovieId: number;


  public keyActions: {[key: string]: () => void} = {
    'k--KeyW': () => {
      this.navigateUp();
    },
    'k--ArrowUp': () => {
      this.navigateUp();
    },
    'k--KeyS': () => {
      this.navigateDown();
    },
    'k--ArrowDown': () => {
      this.navigateDown();
    },
    'k--KeyD': () => {
      this.navigateRight();
    },
    'k--ArrowRight': () => {
      this.navigateRight();
    },
    'k--Enter': () => {
      this.selectCategory(this.categories[this.current]);
    },
    'k--KeyB': async () => {
      let url = '/';
      if (this.routeCategoryId && this.routeMovieId) {
        url += `category/${this.routeCategoryId}`;
      }
      await this.router.navigate([url]);
      this.keyService.focusMovieList();
    },
  };

  constructor(
    private moviesService: MoviesService,
    private keyService: KeyNavService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    super(keyService, router);

    this.subscriptions.push(
      combineLatest([
        this.router.events.pipe(
          filter(event => {
            return event instanceof NavigationEnd;
          }),
          map(() => this.route.snapshot),
          map(activatedRoute => {
            while (activatedRoute.firstChild) {
              activatedRoute = activatedRoute.firstChild;
            }
            return activatedRoute;
          })
        ),
        this.moviesService.getMoviesGenres()
      ]).subscribe(([snapshot, response]) => {
        this.categories = response.genres;
        this.routeCategoryId = snapshot.params.categoryId;
        this.routeMovieId = snapshot.params.movieId;
        this.current = this.getCategoryIndexById(snapshot.params.categoryId) || 0;
      })
    );
  }

  private getCategoryIndexById(id: number): number {
    const index = this.categories.findIndex(category => {
      return category.id == id;
    });
    return index > -1 ? index : null;
  }

  private navigateUp(): void {
    if (this.current > 0) {
      this.current -= 1;
    }
  }

  private navigateDown(): void {
    if (this.current + 1 < this.categories.length) {
      this.current += 1;
    }
  }

  private navigateRight(): void {
    if (this.routeMovieId) {
      this.keyService.focusMovieDetail();
    } else {
      this.keyService.focusMovieList();
    }
  }

  public selectCategory(category: any): void {
    if (category && this.current !== category.id) {
      this.router.navigate(['/category', category.id]);
      this.keyService.focusMovieList();
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe);
  }
}
