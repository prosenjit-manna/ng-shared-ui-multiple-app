import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-alert-banner',
  imports: [CommonModule],
  templateUrl: './alert-banner.html',
  styleUrl: './alert-banner.css',
  encapsulation: ViewEncapsulation.None,
})
export class AlertBanner {
  @Input() type: 'info' | 'warning' | 'error' | 'success' = 'info';
  @Input() title: string = '';
  @Input() dismissible: boolean = true;

  visible: boolean = true;

  dismiss(): void {
    this.visible = false;
  }

  get bgColor(): string {
    switch (this.type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  }

  get textColor(): string {
    switch (this.type) {
      case 'warning':
        return 'text-yellow-900';
      case 'error':
        return 'text-red-900';
      case 'success':
        return 'text-green-900';
      default:
        return 'text-blue-900';
    }
  }

  get iconColor(): string {
    switch (this.type) {
      case 'warning':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      case 'success':
        return 'text-green-600';
      default:
        return 'text-blue-600';
    }
  }
}
