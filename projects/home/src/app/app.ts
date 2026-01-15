import { Component, signal, isDevMode } from '@angular/core';
import { Button } from '../../../shared-ui/src/public-api';
import { userData } from './data';

@Component({
  selector: 'app-root',
  imports: [Button],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('dashboard');
  user: any = (window as any).user;

  constructor() {
    // If dev mode is enabled, set user data
    if (isDevMode()) {
      this.user = userData;
      console.log('Dev mode enabled - using mock user data:', this.user);
    }

    console.log('Dashboard App component initialized.');
    console.log('Global Variable User:', this.user);
  }

  log() {
    console.log('Button clicked from Dashboard App component!');
    console.log('Global Variable User:', this.user);
  }
}
