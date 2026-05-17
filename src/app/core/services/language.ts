import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly LANG_KEY = 'tasweeqar_lang';
  currentLang = signal<string>('ar');

  constructor(private translate: TranslateService) { }

  init() {
    const saved = localStorage.getItem(this.LANG_KEY) || 'ar';
    this.currentLang.set(saved);
    this.apply(saved);
  }

  toggle() {
    const lang = this.currentLang() === 'ar' ? 'en' : 'ar';
    this.currentLang.set(lang);
    localStorage.setItem(this.LANG_KEY, lang);
    this.apply(lang);
  }

  private apply(lang: string) {
    this.translate.use(lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }
}