import { Component, HostListener } from '@angular/core';
import { KeyNavService } from './services/key-navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'filmer';
  longPress: boolean;
  timeout: any;

  @HostListener('document:keyup', ['$event'])
  public onKeyUp(eventData: KeyboardEvent): void {
    if (!this.longPress) {
      this.keyService.distributeKeyPress(eventData);
    }
    this.resetLongPress();
  }

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (!this.timeout) {
      this.initLongPress();
    }
    if (!this.longPress && [37, 38, 39, 40].includes(event.keyCode)) {
      // prevents scroll for arrows keydown events if key is not long-pressed
      event.preventDefault();
    }
  }

  initLongPress(): void {
    this.timeout = setTimeout(() => {
      this.longPress = true;
    }, 500);
  }

  resetLongPress(): void {
    clearTimeout(this.timeout);
    this.timeout = null;
    this.longPress = false;
  }

  constructor(private keyService: KeyNavService) {
  }

}
