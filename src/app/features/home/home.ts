import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/services/language';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule, RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  @ViewChildren('statNumber') statNumbers!: QueryList<ElementRef>;

  stats = [
    { target: Math.floor(Math.random() * 100) + 100, suffix: '+', label: 'stats.projects' },
    { target: Math.floor(Math.random() * 150) + 150, suffix: '+', label: 'stats.clients' },
    { target: Math.floor(Math.random() * 10) + 8, suffix: '+', label: 'stats.years' },
    { target: Math.floor(Math.random() * 50) + 40, suffix: '+', label: 'stats.workers' }
  ];

  displayValues: number[] = [0, 0, 0, 0];
  animated = false;

  constructor(public langService: LanguageService) { }

  ngOnInit() {
    this.observeStats();
  }

  observeStats() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated) {
          this.animated = true;
          this.startCountUp();
        }
      });
    }, { threshold: 0.3 });

    setTimeout(() => {
      const statsSection = document.querySelector('.hero__stats');
      if (statsSection) observer.observe(statsSection);
    }, 500);
  }

  startCountUp() {
    this.stats.forEach((stat, index) => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.target / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(Math.round(increment * step), stat.target);
        this.displayValues[index] = current;
        if (step >= steps) clearInterval(timer);
      }, duration / steps);
    });
  }
}