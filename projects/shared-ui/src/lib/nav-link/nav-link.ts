import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'lib-nav-link',
  imports: [CommonModule],
  templateUrl: './nav-link.html',
  styleUrl: './nav-link.css',
  encapsulation: ViewEncapsulation.None,
})
export class NavLink {
  @Input() href: string = '#';
  @Input() label: string = '';
  @Input() set icon(value: string) {
    this._icon = value;
    this.sanitizedIcon = this.sanitizer.bypassSecurityTrustHtml(value);
  }
  get icon(): string {
    return this._icon;
  }

  private _icon: string = '';
  sanitizedIcon: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}
}
