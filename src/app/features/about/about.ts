import { Component, OnInit, OnDestroy, AfterViewInit, ViewChildren, QueryList, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { TiltDirective } from '../../shared/directives/tilt.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, TiltDirective],
  templateUrl: './about.html',
  styleUrls: ['./about.scss']
})
export class About implements OnInit, OnDestroy {

  @ViewChildren('animatedEl') animatedElements!: QueryList<ElementRef>;

  currentLang = 'ar';
  isDark = false;
  isRtl = true;

  private langSub!: Subscription;

  stats = [
    { key: 'projects', value: '500+', icon: 'fa-building' },
    { key: 'clients', value: '300+', icon: 'fa-handshake' },
    { key: 'years', value: '10+', icon: 'fa-calendar-check' },
    { key: 'workers', value: '150+', icon: 'fa-hard-hat' }
  ];

  features = [
    {
      icon: 'fa-medal',
      titleKey: 'why_choose_us.features.quality.title',
      descKey: 'why_choose_us.features.quality.desc'
    },
    {
      icon: 'fa-clock',
      titleKey: 'why_choose_us.features.experience.title',
      descKey: 'why_choose_us.features.experience.desc'
    },
    {
      icon: 'fa-users-cog',
      titleKey: 'why_choose_us.features.team.title',
      descKey: 'why_choose_us.features.team.desc'
    },
    {
      icon: 'fa-flag-checkered',
      titleKey: 'why_choose_us.features.delivery.title',
      descKey: 'why_choose_us.features.delivery.desc'
    }
  ];

  private translate = inject(TranslateService);


  ngOnInit(): void {
    this.currentLang = this.translate.currentLang || 'ar';
    this.isRtl = this.currentLang === 'ar';
    this.isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    this.langSub = this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
      this.isRtl = event.lang === 'ar';
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
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.15 }
    );

    this.animatedElements.forEach(el => observer.observe(el.nativeElement));
  }
}