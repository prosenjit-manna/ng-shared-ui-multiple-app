import { Component, isDevMode, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {
  LoginService,
  Navbar,
  Footer,
  LoginModal,
  User,
  AlertBanner,
  Button,
} from '../../../shared-ui/src/public-api';
import { userData, pieChartData, pieChartOptions, paymentInfo } from './data';
import { Card } from './card/card';
import { ChartModule } from 'primeng/chart';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, Card, ChartModule, DecimalPipe, Button, TabsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('profile');
  currentUser = signal<User | null>(null);
  pieData = pieChartData;
  pieOptions = pieChartOptions;
  payment = paymentInfo;
  tabs = [
    { value: '0', title: 'Letters', content: 'letters' },
    { value: '1', title: 'Documents', content: 'documents' },
  ];

  constructor(public loginService: LoginService) {
    // Initialize user from window object
    const windowUser = (window as any).user;
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
