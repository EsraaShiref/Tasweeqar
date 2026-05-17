import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly THEME_KEY = 'tasweeqar_theme';
  isDark = signal<boolean>(false);

  init() {
    const saved = localStorage.getItem(this.THEME_KEY);
    const dark = saved === 'dark';
    this.isDark.set(dark);
    this.apply(dark);
  }

  toggle() {
    const dark = !this.isDark();
    this.isDark.set(dark);
    localStorage.setItem(this.THEME_KEY, dark ? 'dark' : 'light');
    this.apply(dark);
  }

  private apply(dark: boolean) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }
}