import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { DrawerModule } from 'primeng/drawer';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { Logo } from '../logo/logo';
import { Button } from '../button/button';
import { InputComponent } from '../input/input';
import { Sidebar } from '../sidebar/sidebar';

export interface User {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'lib-navbar',
  imports: [
    CommonModule,
    FormsModule,
    ToolbarModule,
    ButtonModule,
    AvatarModule,
    RippleModule,
    StyleClassModule,
    Logo,
    Button,
    Sidebar,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  encapsulation: ViewEncapsulation.None,
})
export class Navbar {
  @Input() user?: User;
  @Output() openModal = new EventEmitter<void>();

  visible: boolean = false;

  showModal(): void {
    this.openModal.emit();
  }
}
