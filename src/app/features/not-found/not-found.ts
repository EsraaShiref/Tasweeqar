import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language';
import { ThemeService } from '../../core/services/theme';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './not-found.html',
  styleUrls: ['./not-found.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound implements OnInit {
  protected langService = inject(LanguageService);
  protected themeService = inject(ThemeService);
  private seoService = inject(SeoService);

  get isRtl() {
    return this.langService.currentLang() === 'ar';
  }

  ngOnInit(): void {
    this.seoService.setPage(
      {
        title: '404 - الصفحة غير موجودة | تسويقار',
        description: 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
      },
      {
        title: '404 - Page Not Found | Tasweeqar',
        description: 'Sorry, the page you are looking for does not exist or has been moved.',
      },
      this.langService.currentLang() as 'ar' | 'en'
    );
  }
}
