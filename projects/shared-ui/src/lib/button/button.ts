import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'lib-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css',
  encapsulation: ViewEncapsulation.None,
})
export class Button {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() customClass: string = '';
  @Output() onClick = new EventEmitter<void>();

  get buttonClasses(): string {
    const baseStyles =
      'rounded-full font-sans transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

    const variantStyles: Record<ButtonVariant, string> = {
      primary: 'bg-brand text-white hover:bg-brand-light tracking-tight',
      secondary: 'bg-gray-100 text-brand border border-gray-100 hover:border-brand tracking-tight',
      outline: 'border border-brand text-brand bg-white hover:bg-gray-50 tracking-tight ',
    };

    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'px-4 py-1.25 text-[13px] ',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return `${baseStyles} ${variantStyles[this.variant]} ${sizeStyles[this.size]} ${this.customClass}`;
  }

  handleClick(): void {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }
}
