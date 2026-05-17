import { Component, OnInit, NgZone } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { LanguageService } from '../../core/services/language';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule, RouterLink, NgFor],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  stats = [
    { target: 150, suffix: '+', label: 'stats.projects' },
    { target: 200, suffix: '+', label: 'stats.clients' },
    { target: 10, suffix: '+', label: 'stats.years' },
    { target: 50, suffix: '+', label: 'stats.workers' }
  ];

  displayValues: number[] = [0, 0, 0, 0];
  animated = false;

  constructor(
    public langService: LanguageService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.observeStats();
    this.observeElements();
  }

  observeStats() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated) {
          this.animated = true;
          this.ngZone.run(() => this.startCountUp());
        }
      });
    }, { threshold: 0.3 });

    setTimeout(() => {
      const statsSection = document.querySelector('.hero__stats');
      if (statsSection) observer.observe(statsSection);
    }, 500);
  }

  observeElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 300);
  }

  startCountUp() {
    this.stats.forEach((stat, index) => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.target / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        this.displayValues[index] = Math.min(Math.round(increment * step), stat.target);
        if (step >= steps) clearInterval(timer);
      }, duration / steps);
    });
  }
}