import { OnDestroy, OnInit, Component } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { aggregate } from '@app/services/aggregate.operator';
import { Router } from '@angular/router';
import { KeyNavService } from '@app/services/key-navigation.service';

@Component({
  selector: 'app-abstract-keypress',
  template: '<div></div>'
})

export abstract class AbstractKeypressComponent implements OnInit, OnDestroy {
  protected componentId: string;

  private keyEventObservable: Observable<any>;
  private keyEventSubscription: Subscription;
  public keyActions: {[key: string]: () => void};

  protected constructor(
    private keyNavService: KeyNavService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.keyEventObservable = this.keyNavService.keyEventObs
      .pipe(
        aggregate(10, 50),
        map(this.keyNavService.convertToString),
      );

    this.keyNavService.focusedComponentId$.subscribe(id => {
      if (this.componentId === id) {
        this.subscribe();
      } else {
        this.unsubscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  public reactToKeyPress = (key: string): void => {
    if (this.keyActions[key]) {
      this.keyActions[key]();
    }
  }

  private subscribe(): void {
    this.unsubscribe();
    this.keyEventSubscription = this.keyEventObservable.subscribe(
      this.reactToKeyPress,
    );
  }

  private unsubscribe(): void {
    if (this.keyEventSubscription && !this.keyEventSubscription.closed) {
      this.keyEventSubscription.unsubscribe();
    }
  }

  get isActive(): boolean {
    return this.componentId === this.keyNavService.focusedComponentId;
  }

}
