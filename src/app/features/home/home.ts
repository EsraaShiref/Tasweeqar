import { Component, OnInit, OnDestroy, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/services/language';
import { SeoService } from '../../core/services/seo.service';
import { PROJECTS, Project } from '../../core/data/projects.data';
import { TiltDirective } from '../../shared/directives/tilt.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule, RouterLink, TiltDirective],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit, OnDestroy {
  readonly featuredProjects: Project[] = PROJECTS.filter(p => p.featured);

  particles = Array.from({ length: 30 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  protected langService = inject(LanguageService);
  private seoService = inject(SeoService);

  private revealObserver!: IntersectionObserver;

  ngOnInit(): void {
    this.seoService.setPage(
      {
        title: 'الرئيسية | تسويقار',
        description: 'تسويقار — شركة مقاولات وبناء سعودية متخصصة في المشاريع الإنشائية والصيانة والحفريات.',
      },
      {
        title: 'Home | Tasweeqar',
        description: 'Tasweeqar — Saudi contracting & construction company specialising in building, maintenance, and excavation projects.',
      },
      this.langService.currentLang() as 'ar' | 'en'
    );
    this.observeElements();
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
  }

  private observeElements(): void {
    this.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            this.revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => this.revealObserver.observe(el));
    }, 300);
  }
}
