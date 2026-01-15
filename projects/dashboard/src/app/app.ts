import { Component, signal } from '@angular/core';
import { Button } from '../../../shared-ui/src/public-api';

@Component({
  selector: 'app-root',
  imports: [Button],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('dashboard');
}
