import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

@Component({
  selector: 'lib-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css',
  encapsulation: ViewEncapsulation.None,
})
export class Button {
  @Input() variant: ButtonVariant = 'primary';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() customClass: string = '';
  @Output() onClick = new EventEmitter<void>();

  get buttonClasses(): string {
    const baseStyles =
      'px-4 py-2.5 rounded-full font-sans transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

    const variantStyles: Record<ButtonVariant, string> = {
      primary: 'bg-brand text-white hover:bg-brand-light tracking-tight',
      secondary: 'bg-gray-100 text-brand border border-gray-100 hover:border-brand tracking-tight',
      outline: 'border border-brand text-brand bg-white hover:bg-gray-50 tracking-tight ',
    };

    return `${baseStyles} ${variantStyles[this.variant]} ${this.customClass}`;
  }

  handleClick(): void {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }
}
