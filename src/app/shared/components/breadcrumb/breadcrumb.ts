import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  template: `
    <nav class="breadcrumb" aria-label="breadcrumb" [dir]="translate.currentLang === 'ar' ? 'rtl' : 'ltr'">
      <ol>
        <li><a routerLink="/">{{ 'nav.home' | translate }}</a></li>
        <li *ngFor="let item of items; last as isLast">
          <span class="separator" [style.transform]="translate.currentLang === 'ar' ? 'rotate(180deg)' : 'none'" style="display:inline-block">›</span>
          <a *ngIf="!isLast" [routerLink]="item.path">{{ item.label }}</a>
          <span *ngIf="isLast" aria-current="page">{{ item.label }}</span>
        </li>
      </ol>
    </nav>
  `,
  styles: [`
    .breadcrumb {
      padding: 1rem 0;
      font-size: var(--font-ar-small, 0.85rem);
    }
    .breadcrumb ol {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      align-items: center;
      margin: 0;
      padding: 0;
    }
    .breadcrumb a {
      color: var(--color-text-secondary);
      text-decoration: none;
      transition: color 0.3s;
    }
    .breadcrumb a:hover {
      color: var(--color-primary);
    }
    .breadcrumb .separator {
      color: var(--color-text-muted);
      margin: 0 0.25rem;
    }
    .breadcrumb [aria-current="page"] {
      color: var(--color-text-primary);
      font-weight: 600;
    }
  `]
})
export class Breadcrumb {
  @Input() items: { label: string; path: string }[] = [];
  public translate = inject(TranslateService);
}
