import { Component, signal, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cardsData } from './data';
import { Navbar, LoginModal, LoginService, User } from '../../../shared-ui/src/public-api';
import { Hero } from './hero/hero';

@Component({
  selector: 'app-root',
  imports: [Navbar, LoginModal, Hero, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('dashboard');
  cards = cardsData;
  currentUser = signal<User | null>(null);

  constructor(public loginService: LoginService) {
    // Initialize user from window object
    const windowUser = (window as any).user;
    if (windowUser) {
      this.currentUser.set(windowUser);
    }

    // If dev mode is enabled, set mock user data
    if (isDevMode() && !this.currentUser()) {
      this.currentUser.set(null);
      console.log('Dev mode enabled - using mock user data:', null);
    }

    console.log('Global Variable User:', this.currentUser());
  }

  openModal(): void {
    this.loginService.openModal();
  }

  onLoginSuccess(user: User): void {
    this.currentUser.set(user);
  }
}
