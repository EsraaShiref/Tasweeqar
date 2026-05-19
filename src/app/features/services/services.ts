import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  QueryList,
  ViewChildren,
  ElementRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { TiltDirective } from '../../shared/directives/tilt.directive';

export interface ServiceCard {
  key: string;
  icon: string;
  full?: boolean;
}

export interface ProcessStep {
  step: number;
  icon: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, TiltDirective],
  templateUrl: './services.html',
  styleUrls: ['./services.scss'],
})
export class Services implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('animatedEl') animatedElements!: QueryList<ElementRef>;

  currentLang = 'ar';
  isRtl = true;

  private langSub!: Subscription;

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
      titleAr: 'الاستشارة الأولية',
      titleEn: 'Initial Consultation',
      descAr: 'نجتمع بك لفهم متطلبات مشروعك وأهدافك بشكل كامل.',
      descEn: 'We meet with you to fully understand your project requirements and goals.',
    },
    {
      step: 2,
      icon: 'fa-file-contract',
      titleAr: 'الدراسة والتخطيط',
      titleEn: 'Study & Planning',
      descAr: 'نُعِدّ دراسة شاملة وخطة تفصيلية لتنفيذ المشروع بأعلى كفاءة.',
      descEn:
        'We prepare a comprehensive study and detailed plan for the most efficient execution.',
    },
    {
      step: 3,
      icon: 'fa-hard-hat',
      titleAr: 'التنفيذ',
      titleEn: 'Execution',
      descAr: 'ينفذ فريقنا المتخصص المشروع بدقة واحترافية عالية.',
      descEn: 'Our specialist team executes the project with precision and high professionalism.',
    },
    {
      step: 4,
      icon: 'fa-circle-check',
      titleAr: 'التسليم وضمان الجودة',
      titleEn: 'Delivery & Quality Assurance',
      descAr: 'نُسلّم المشروع في الموعد المحدد مع ضمان أعلى معايير الجودة.',
      descEn: 'We deliver on time with a guarantee of the highest quality standards.',
    },
  ];

  private translate = inject(TranslateService);


  ngOnInit(): void {
    this.currentLang = this.translate.currentLang || 'ar';
    this.isRtl = this.currentLang === 'ar';

    this.langSub = this.translate.onLangChange.subscribe((e) => {
      this.currentLang = e.lang;
      this.isRtl = e.lang === 'ar';
    });
  }

  ngAfterViewInit(): void {
    this.observeElements();
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  private observeElements(): void {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in-view');
        }),
      { threshold: 0.12 },
    );
    this.animatedElements.forEach((el) => observer.observe(el.nativeElement));
  }
}
