import {
  Component,
  Input as InputDecorator,
  Output,
  EventEmitter,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';

@Component({
  selector: 'lib-input',
  imports: [CommonModule],
  templateUrl: './input.html',
  styleUrl: './input.css',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @InputDecorator() type: InputType = 'text';
  @InputDecorator() placeholder: string = '';
  @InputDecorator() label: string = '';
  @InputDecorator() disabled: boolean = false;
  @InputDecorator() required: boolean = false;
  @InputDecorator() customClass: string = '';
  @InputDecorator() error: string = '';
  @Output() valueChange = new EventEmitter<string>();

  value: string = '';
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  get inputClasses(): string {
    const baseStyles =
      'w-full px-4 py-1.5 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-brand focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed font-sans text-sm lg:text-base text-gray-700';
    return `${baseStyles} ${this.customClass}`;
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
