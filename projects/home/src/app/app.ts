import { Component, signal, isDevMode } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { userData, cardsData, User } from './data';
import { Navbar } from '../../../shared-ui/src/public-api';
import { Button } from '../../../shared-ui/src/public-api';
import { InputComponent } from '../../../shared-ui/src/public-api';
import { Logo } from '../../../shared-ui/src/public-api';
import { Hero } from './hero/hero';

@Component({
  selector: 'app-root',
  imports: [Navbar, Button, InputComponent, Logo, ReactiveFormsModule, Hero, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('dashboard');
  user: User = (window as any).user;
  cards = cardsData;
  showModal: boolean = false;
  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder) {
    // Initialize form with validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // If dev mode is enabled, set user data
    if (isDevMode()) {
      console.log('Dev mode enabled - using mock user data:', this.user);
    }

    console.log('Dashboard App component initialized.');
    console.log('Global Variable User:', this.user);
  }

  openModal(): void {
    this.showModal = true;
    this.submitted = false;
    this.loginForm.reset();
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    console.log('Login submitted:', this.loginForm.value);
    this.user = {
      name: this.loginForm.value.email,
      email: this.loginForm.value.email,
      role: 'admin',
    };
    this.showModal = false;
    this.submitted = false;
    this.loginForm.reset();
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  log() {
    console.log('Button clicked from Dashboard App component!');
    console.log('Global Variable User:', this.user);
  }
}
