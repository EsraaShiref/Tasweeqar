import { Component, OnInit, NgZone, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/services/language';
import { PROJECTS, Project } from '../../core/data/projects.data';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule, RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  stats = [
    { target: 150, suffix: '+', label: 'stats.projects' },
    { target: 200, suffix: '+', label: 'stats.clients' },
    { target: 10, suffix: '+', label: 'stats.years' },
    { target: 50, suffix: '+', label: 'stats.workers' },
  ];

  readonly featuredProjects: Project[] = PROJECTS.filter(p => p.featured);

  particles = Array.from({ length: 30 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  displayValues: number[] = [0, 0, 0, 0];
  animated = false;

  protected langService = inject(LanguageService);
  private ngZone = inject(NgZone);


  ngOnInit() {
    this.observeStats();
    this.observeElements();
  }

  observeStats() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.animated) {
            this.animated = true;
            this.ngZone.run(() => this.startCountUp());
          }
        });
      },
      { threshold: 0.3 },
    );

    setTimeout(() => {
      const statsSection = document.querySelector('.hero__stats');
      if (statsSection) observer.observe(statsSection);
    }, 500);
  }

  observeElements() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
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
