import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

export enum Focusable {
  sidebar = 'MoviesCategorySidebar',
  moviesList = 'MovieList',
  movieDetails = 'MovieDetails'
}

@Injectable({
  providedIn: 'root'
})
export class KeyNavService {
  // tslint:disable-next-line:variable-name
  private _focusedComponentId = new BehaviorSubject<string>('MoviesCategorySidebar');
  private keyEventSubject = new Subject<KeyboardEvent>();
  public keyEventObs: Observable<KeyboardEvent> = this.keyEventSubject.asObservable();

  public distributeKeyPress(keyValue: KeyboardEvent): void {
    this.keyEventSubject.next(keyValue);
  }

  public permitKey(keyEvent: KeyboardEvent): boolean {
    const disallowedKeys = ['Shift', 'Control', 'Alt', 'Meta'];
    return !disallowedKeys.includes(keyEvent.key);
  }

  public convertToString = (keyEventList: KeyboardEvent[]): string  => {
    const modifiers = this.modifierKeysToString(keyEventList[0]);
    return `${ modifiers }-${ keyEventList[0].code }`;
  }

  modifierKeysToString(keypress: KeyboardEvent, prefix = 'k-'): string {
    const modifierKeys = ['altKey', 'ctrlKey', 'shiftKey'];
    let keyCode = prefix;
    for (const code of modifierKeys) {
      if (keypress[code]) {
        keyCode += code.substr(0, 1);
      }
    }
    return keyCode;
  }

  focusSidebar(): void {
    this.focusedComponentId = Focusable.sidebar;
  }

  focusMovieList(): void {
    this.focusedComponentId = Focusable.moviesList;
  }

  focusMovieDetail(): void {
    this.focusedComponentId = Focusable.movieDetails;
  }

  get focusedComponentId(): string {
    return this._focusedComponentId.getValue();
  }

  set focusedComponentId(val: string) {
    this._focusedComponentId.next(val);
  }

  get focusedComponentId$(): BehaviorSubject<string> {
    return this._focusedComponentId;
  }

}
