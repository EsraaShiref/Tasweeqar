import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  QueryList,
  ViewChildren,
  ElementRef,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language';
import { SeoService } from '../../core/services/seo.service';
import { TiltDirective } from '../../shared/directives/tilt.directive';

export interface ServiceCard {
  key: string;
  icon: string;
  full?: boolean;
}

export interface ProcessStep {
  step: number;
  icon: string;
  titleKey: string;
  descKey: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterModule, TranslateModule, TiltDirective],
  templateUrl: './services.html',
  styleUrls: ['./services.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('animatedEl') animatedElements!: QueryList<ElementRef>;

  protected langService = inject(LanguageService);
  private seoService = inject(SeoService);

  private observer!: IntersectionObserver;

  get isRtl() { return this.langService.currentLang() === 'ar'; }

  /** All service cards – last one spans full width */
  serviceCards: ServiceCard[] = [
    { key: 'contracting', icon: 'fa-helmet-safety' },
    { key: 'maintenance', icon: 'fa-screwdriver-wrench' },
    { key: 'project_services', icon: 'fa-diagram-project' },
    { key: 'extensions', icon: 'fa-plug' },
    { key: 'excavation', icon: 'fa-truck-pickup' },
    { key: 'building', icon: 'fa-building' },
    { key: 'all', icon: 'fa-city', full: true },
  ];

  /** How-we-work process steps */
  processSteps: ProcessStep[] = [
    {
      step: 1,
      icon: 'fa-comments',
      titleKey: 'services_page.process.step1.title',
      descKey: 'services_page.process.step1.desc',
    },
    {
      step: 2,
      icon: 'fa-file-contract',
      titleKey: 'services_page.process.step2.title',
      descKey: 'services_page.process.step2.desc',
    },
    {
      step: 3,
      icon: 'fa-hard-hat',
      titleKey: 'services_page.process.step3.title',
      descKey: 'services_page.process.step3.desc',
    },
    {
      step: 4,
      icon: 'fa-circle-check',
      titleKey: 'services_page.process.step4.title',
      descKey: 'services_page.process.step4.desc',
    },
  ];

  ngOnInit(): void {
    this.seoService.setPage(
      {
        title: 'خدماتنا | تسويقار',
        description: 'اكتشف خدمات المقاولات والإنشاء والصيانة والحفريات والترميم التي تقدمها تسويقار في المملكة.',
      },
      {
        title: 'Our Services | Tasweeqar',
        description: 'Explore the contracting, construction, maintenance, excavation, and renovation services offered by Tasweeqar.',
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
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in-view');
        }),
      { threshold: 0.12 },
    );
    this.animatedElements.forEach((el) => this.observer.observe(el.nativeElement));
  }
}
