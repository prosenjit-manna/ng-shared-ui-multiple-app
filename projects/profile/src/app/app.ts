import { Component, isDevMode, signal } from '@angular/core';
import { LoginService, Navbar, Footer, LoginModal, User } from '../../../shared-ui/src/public-api';
import { userData } from './data';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, LoginModal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('profile');
  currentUser = signal<User | null>(null);

  constructor(public loginService: LoginService) {
    // Initialize user from window object
    const windowUser = (window as any).user;
    console.log(windowUser);
    if (windowUser) {
      this.currentUser.set(windowUser);
      console.log(windowUser);
    }

    // If dev mode is enabled, set mock user data
    if (isDevMode() && !this.currentUser() && userData) {
      this.currentUser.set(userData);
      console.log('Dev mode enabled - using mock user data:', userData);
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
