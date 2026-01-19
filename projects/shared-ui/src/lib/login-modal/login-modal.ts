import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Logo } from '../logo/logo';
import { InputComponent } from '../input/input';
import { Button } from '../button/button';
import { User } from '../types';

@Component({
  selector: 'lib-login-modal',
  imports: [CommonModule, ReactiveFormsModule, Logo, InputComponent, Button],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginModal {
  @Input() redirectUrl?: string;
  @Output() loginSuccess = new EventEmitter<User>();

  constructor(public loginService: LoginService) {}

  closeModal(): void {
    this.loginService.closeModal();
  }

  onSubmit(): void {
    this.loginService.onSubmit(this.redirectUrl, (user: User) => {
      this.loginSuccess.emit(user);
    });
  }
}
