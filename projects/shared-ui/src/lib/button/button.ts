import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() label!: string;
  @Output() onClick = new EventEmitter<void>();


}
