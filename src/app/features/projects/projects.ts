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
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language';

export interface Project {
  id: string;
  key: string;
  image: string;
  categoryKey: string;
  status: 'done' | 'progress';
  featured: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, FormsModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Projects implements OnInit, AfterViewInit, OnDestroy {

  langService = inject(LanguageService);
  private platformId = inject(PLATFORM_ID);
  private observer!: IntersectionObserver;

  @ViewChildren('revealEl') revealEls!: QueryList<ElementRef>;

  // ── Search & Filter State ──────────────────────────────
  searchQuery = signal('');
  activeFilter = signal('all');

  readonly categories = ['all', 'contracting', 'maintenance', 'mep', 'excavation', 'construction', 'services'];

  // ── Project Data ───────────────────────────────────────
  readonly allProjects: Project[] = [
    { id: 'p1', key: 'p1', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800', categoryKey: 'contracting', status: 'done', featured: true },
    { id: 'p2', key: 'p2', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800', categoryKey: 'construction', status: 'progress', featured: true },
    { id: 'p3', key: 'p3', image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800', categoryKey: 'mep', status: 'done', featured: true },
    { id: 'p4', key: 'p4', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', categoryKey: 'contracting', status: 'done', featured: false },
    { id: 'p5', key: 'p5', image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800', categoryKey: 'excavation', status: 'progress', featured: true },
    { id: 'p6', key: 'p6', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800', categoryKey: 'construction', status: 'done', featured: false },
    { id: 'p7', key: 'p7', image: 'https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=800', categoryKey: 'maintenance', status: 'done', featured: false },
    { id: 'p8', key: 'p8', image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=800', categoryKey: 'construction', status: 'progress', featured: false },
    { id: 'p9', key: 'p9', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', categoryKey: 'services', status: 'done', featured: false },
  ];

  // ── Computed Filtered List ─────────────────────────────
  readonly filteredProjects = computed(() => {
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

  // ── Inject TranslateService for sync translation ───────
  private translate = inject(TranslateService);

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
  ngOnInit(): void { }

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
    this.revealEls.changes.subscribe((els: QueryList<ElementRef>) => {
      els.forEach(el => this.observer.observe(el.nativeElement));
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}