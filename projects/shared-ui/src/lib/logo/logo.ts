import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-logo',
  imports: [CommonModule],
  templateUrl: './logo.html',
  styleUrl: './logo.css',
  standalone: true,
})
export class Logo {
  @Input() width: number = 120;
  @Input() height: number = 40;
  @Input() fontSize: number = 24;
  @Input() text: string = 'SPS';
  @Input() color: string = '#1e293b';
  @Input() fontFamily: string = 'Poppins, sans-serif';
  @Input() fontWeight: number = 700;
}
