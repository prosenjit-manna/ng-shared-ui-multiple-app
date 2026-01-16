import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Button } from '../../../../shared-ui/src/public-api';

@Component({
  selector: 'app-cards',
  imports: [Button],
  templateUrl: './cards.html',
  styleUrl: './cards.scss',
})
export class Cards {
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() link: string = '#';

  constructor(private sanitizer: DomSanitizer) {}

  sanitizeIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.icon);
  }
}
