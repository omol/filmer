import { MoviesService } from '@modules/movies/services/movies.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Components
import { AbstractKeypressComponent } from '@app/modules/movies/components/abstract.keypress';
// Services
import { KeyNavService, Focusable } from '@app/services/key-navigation.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})

export class MovieDetailsComponent extends AbstractKeypressComponent implements OnInit {
  componentId = Focusable.movieDetails;
  loader = true;
  movie: any;
  currentAction: number = null;

  public keyActions: { [key: string]: () => void } = {
    'k--KeyB': async () => {
      const id = this.route.snapshot.params.categoryId;
      let url = '/';
      if (id) {
        url += `category/${id}`;
      }
      await this.router.navigate([url]);
      this.keyService.focusMovieList();
    },
    'k--KeyA': () => {
      this.currentAction = null;
      this.navigateLeft();
    },
    'k--ArrowLeft': () => {
      this.currentAction = null;
      this.navigateLeft();
    },
  };

  constructor(
    private route: ActivatedRoute,
    private keyService: KeyNavService,
    private moviesService: MoviesService,
    public router: Router,
  ) {
    super(keyService, router);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getMovieData();
  }

  private getMovieData(): void {
    this.loader = true;
    this.moviesService.getMovieById(this.route.snapshot.params.movieId).subscribe(m => {
      this.movie = m;
      this.loader = false;
    }, error => {
      this.loader = false;
    });
  }

  public watchMovieBtnEvent(): void {
    this.keyService.focusMovieDetail();
  }

  public navigateLeft(): void {
    this.keyService.focusSidebar();
  }

}
