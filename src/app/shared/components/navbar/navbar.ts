import { Component, HostListener, signal, inject, OnInit, OnDestroy, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from '../../../core/services/theme';
import { LanguageService } from '../../../core/services/language';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Navbar implements OnInit, OnDestroy {
  protected themeService = inject(ThemeService);
  protected langService = inject(LanguageService);
  private platformId = inject(PLATFORM_ID);

  menuOpen = signal(false);
  scrolled = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', this.closeOnScroll.bind(this));

      // Visual verification helper for screenshotting states
      const params = new URLSearchParams(window.location.search);
      if (params.get('menuOpen') === 'true') {
        this.menuOpen.set(true);
      }
      const langParam = params.get('lang');
      if (langParam === 'en' || langParam === 'ar') {
        if (this.langService.currentLang() !== langParam) {
          this.langService.toggle();
        }
      }
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.closeOnScroll.bind(this));
    }
  }

  private closeOnScroll(): void {
    if (this.menuOpen()) {
      this.menuOpen.set(false);
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }
}