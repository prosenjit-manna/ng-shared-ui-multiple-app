import { Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, LoginCredentials } from '../types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // Modal visibility state
  private _isModalVisible = signal(false);
  readonly isModalVisible = this._isModalVisible.asReadonly();

  // Login form
  loginForm: FormGroup;
  submitted = signal(false);

  constructor(private fb: FormBuilder) {
    // Initialize form with validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Opens the login modal
   */
  openModal(): void {
    this._isModalVisible.set(true);
    this.submitted.set(false);
    this.loginForm.reset();
  }

  /**
   * Closes the login modal
   */
  closeModal(): void {
    this._isModalVisible.set(false);
    this.submitted.set(false);
    this.loginForm.reset();
  }

  /**
   * Handles login form submission
   * @param redirectUrl Optional URL to redirect after successful login
   * @param onSuccess Optional callback to execute after successful login
   */
  onSubmit(redirectUrl?: string, onSuccess?: (user: User) => void): void {
    this.submitted.set(true);

    if (this.loginForm.invalid) {
      return;
    }

    console.log('Login submitted:', this.loginForm.value);

    const user: User = {
      name: this.loginForm.value.email,
      email: this.loginForm.value.email,
      role: 'admin',
    };

    // Store in window for page reloads
    (window as any).user = user;

    // Execute callback if provided
    if (onSuccess) {
      onSuccess(user);
    }

    this.closeModal();

    // Redirect if URL is provided
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }

  /**
   * Convenience getter for easy access to form fields
   */
  get f() {
    return this.loginForm.controls;
  }
}
