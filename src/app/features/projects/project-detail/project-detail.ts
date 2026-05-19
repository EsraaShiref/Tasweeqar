import { Component, OnInit, inject, effect, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { LanguageService } from '../../../core/services/language';
import { SeoService } from '../../../core/services/seo.service';
import { PROJECTS, Project } from '../../../core/data/projects.data';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [NgClass, RouterModule, TranslateModule, RevealDirective],
  templateUrl: './project-detail.html',
  styleUrls: ['./project-detail.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetail implements OnInit {
  private route = inject(ActivatedRoute);
  protected langService = inject(LanguageService);
  private translate = inject(TranslateService);
  private seoService = inject(SeoService);

  projectId: string = '';
  baseProject!: Project;

  project = {
    id: '',
    name: '',
    nameEn: '',
    city: '',
    cityEn: '',
    serviceType: '',
    serviceTypeEn: '',
    status: '',
    statusEn: '',
    statusClass: '',
    area: '',
    areaEn: '',
    year: '',
    client: '',
    clientEn: '',
    description: '',
    descriptionEn: '',
    image: ''
  };

  // getter for background image in template
  get heroBgImage(): string {
    return `url("${this.project.image}")`;
  }

  breadcrumbItems: any[] = [];

  constructor() {
    // Re-render content whenever the active language changes
    effect(() => {
      this.langService.currentLang(); // track signal
      if (this.baseProject) {
        this.updateContent();
      }
    });
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id') || 'p1';
    this.baseProject = PROJECTS.find(p => p.id === this.projectId) || PROJECTS[0];
    this.project.id = this.baseProject.id;
    this.project.image = this.baseProject.image;
    this.project.statusClass = this.baseProject.status === 'done' ? 'status-done' : 'status-progress';
    this.updateContent();
  }

  updateContent() {
    const key = this.baseProject.key;
    const cat = this.baseProject.categoryKey;
    const isAr = this.langService.currentLang() === 'ar';

    const title = this.translate.instant(`projects_page.items.${key}.title`) || '';
    const desc = this.translate.instant(`projects_page.items.${key}.desc`) || '';
    const region = this.translate.instant(`projects_page.items.${key}.region`) || '';
    const service = this.translate.instant(`projects_page.categories.${cat}`) || '';
    const statusLabel = this.translate.instant(
      this.baseProject.status === 'done' ? 'projects_page.status_done' : 'projects_page.status_progress'
    ) || '';

    // Specifications from i18n
    const areaVal = this.translate.instant(`projects_page.items.${key}.area`) || '';
    const yearVal = this.translate.instant(`projects_page.items.${key}.year`) || '';
    const clientVal = this.translate.instant(`projects_page.items.${key}.client`) || '';

    if (isAr) {
      this.project.name = title;
      this.project.description = desc;
      this.project.city = region;
      this.project.serviceType = service;
      this.project.status = statusLabel;
      this.project.area = areaVal;
      this.project.year = yearVal;
      this.project.client = clientVal;
    } else {
      this.project.nameEn = title;
      this.project.descriptionEn = desc;
      this.project.cityEn = region;
      this.project.serviceTypeEn = service;
      this.project.statusEn = statusLabel;
      this.project.areaEn = areaVal;
      this.project.year = yearVal;
      this.project.clientEn = clientVal;
    }

    // Call SeoService
    this.seoService.setPage(
      {
        title: `${title} | تسويقار`,
        description: desc,
      },
      {
        title: `${title} | Tasweeqar`,
        description: desc,
      },
      isAr ? 'ar' : 'en'
    );

    this.updateBreadcrumb(title);
  }

  updateBreadcrumb(title: string) {
    const isAr = this.langService.currentLang() === 'ar';
    this.breadcrumbItems = [
      { label: isAr ? 'مشاريعنا' : 'Projects', path: '/projects' },
      { label: title, path: `/projects/${this.projectId}` }
    ];
  }
}