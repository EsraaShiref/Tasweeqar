import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
  PLATFORM_ID,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../core/services/language';
import { SeoService } from '../../core/services/seo.service';
import { PROJECTS, Project } from '../../core/data/projects.data';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [TranslateModule, RouterModule, FormsModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Projects implements OnInit, AfterViewInit, OnDestroy {

  langService = inject(LanguageService);
  private platformId = inject(PLATFORM_ID);
  private translate = inject(TranslateService);
  private route = inject(ActivatedRoute);
  private seoService = inject(SeoService);

  private observer!: IntersectionObserver;
  private revealSub!: Subscription;

  @ViewChildren('revealEl') revealEls!: QueryList<ElementRef>;

  // ── Search & Filter State ──────────────────────────────
  searchQuery = signal('');
  activeFilter = signal('all');

  readonly categories = ['all', 'contracting', 'maintenance', 'mep', 'excavation', 'construction', 'services'];

  // ── Project Data ───────────────────────────────────────
  readonly allProjects: Project[] = PROJECTS;

  // ── Computed Filtered List ─────────────────────────────
  readonly filteredProjects = computed(() => {
    this.langService.currentLang(); // track language changes for reactivity
    const q = this.searchQuery().toLowerCase().trim();
    const cat = this.activeFilter();
    return this.allProjects.filter(p => {
      const matchesCat = cat === 'all' || p.categoryKey === cat;
      if (!q) return matchesCat;
      const title = this.getTranslation(`projects_page.items.${p.key}.title`).toLowerCase();
      const city = this.getTranslation(`projects_page.items.${p.key}.city`).toLowerCase();
      const catLabel = this.getTranslation(`projects_page.categories.${p.categoryKey}`).toLowerCase();
      return matchesCat && (title.includes(q) || city.includes(q) || catLabel.includes(q));
    });
  });


  private getTranslation(key: string): string {
    return this.translate.instant(key) || '';
  }

  setFilter(cat: string): void {
    this.activeFilter.set(cat);
  }

  onSearch(val: string): void {
    this.searchQuery.set(val);
  }

  // ── IntersectionObserver for reveal animation ──────────
  ngOnInit(): void {
    this.seoService.setPage(
      {
        title: 'مشاريعنا | تسويقار',
        description: 'تصفح معرض مشاريع تسويقار الإنشائية، مشاريع الصيانة، الحفريات والمباني السكنية والتجارية المنفذة في مختلف مناطق المملكة.',
      },
      {
        title: 'Our Projects | Tasweeqar',
        description: 'Browse Tasweeqar’s portfolio of construction, maintenance, excavation, residential, and commercial projects across Saudi Arabia.',
      },
      this.langService.currentLang() as 'ar' | 'en'
    );

    this.route.queryParams.subscribe(params => {
      if (params['filter']) {
        this.activeFilter.set(params['filter']);
      }
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            this.observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    this.revealEls.forEach(el => this.observer.observe(el.nativeElement));

    this.revealSub = this.revealEls.changes.subscribe((els: QueryList<ElementRef>) => {
      els.forEach(el => {
        if (!el.nativeElement.classList.contains('revealed')) {
          this.observer.observe(el.nativeElement);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.revealSub?.unsubscribe();
  }
}