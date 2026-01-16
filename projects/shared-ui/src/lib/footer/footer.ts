import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  encapsulation: ViewEncapsulation.None,
})
export class Footer {
  currentYear: number = new Date().getFullYear();
}
