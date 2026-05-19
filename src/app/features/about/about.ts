import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChildren,
  QueryList,
  ElementRef,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language';
import { ThemeService } from '../../core/services/theme';
import { SeoService } from '../../core/services/seo.service';
import { TiltDirective } from '../../shared/directives/tilt.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule, TranslateModule, TiltDirective],
  templateUrl: './about.html',
  styleUrls: ['./about.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('animatedEl') animatedElements!: QueryList<ElementRef>;

  protected langService = inject(LanguageService);
  protected themeService = inject(ThemeService);
  private seoService = inject(SeoService);

  private observer!: IntersectionObserver;

  get isRtl() { return this.langService.currentLang() === 'ar'; }

  stats = [
    { key: 'projects', value: '500+', icon: 'fa-building' },
    { key: 'clients',  value: '300+', icon: 'fa-handshake' },
    { key: 'years',    value: '10+',  icon: 'fa-calendar-check' },
    { key: 'workers',  value: '150+', icon: 'fa-hard-hat' },
  ];

  features = [
    {
      icon: 'fa-medal',
      titleKey: 'why_choose_us.features.quality.title',
      descKey:  'why_choose_us.features.quality.desc',
    },
    {
      icon: 'fa-clock',
      titleKey: 'why_choose_us.features.experience.title',
      descKey:  'why_choose_us.features.experience.desc',
    },
    {
      icon: 'fa-users-cog',
      titleKey: 'why_choose_us.features.team.title',
      descKey:  'why_choose_us.features.team.desc',
    },
    {
      icon: 'fa-flag-checkered',
      titleKey: 'why_choose_us.features.delivery.title',
      descKey:  'why_choose_us.features.delivery.desc',
    },
  ];

  ngOnInit(): void {
    this.seoService.setPage(
      {
        title: 'من نحن | تسويقار',
        description: 'تعرّف على تسويقار — شركة مقاولات سعودية بخبرة تزيد على 10 سنوات في تنفيذ المشاريع الإنشائية والصيانة.',
      },
      {
        title: 'About Us | Tasweeqar',
        description: 'Learn about Tasweeqar — a Saudi contracting company with over 10 years of experience in construction and maintenance projects.',
      },
      this.langService.currentLang() as 'ar' | 'en'
    );
  }

  ngAfterViewInit(): void {
    this.observeElements();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private observeElements(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.15 }
    );

    this.animatedElements.forEach(el => this.observer.observe(el.nativeElement));
  }
}