import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { LanguageService } from '../../../core/services/language';
import { PROJECTS, Project } from '../../../core/data/projects.data';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, RevealDirective],
  templateUrl: './project-detail.html',
  styleUrls: ['./project-detail.scss']
})
export class ProjectDetail implements OnInit {
  private route = inject(ActivatedRoute);
  langService = inject(LanguageService);
  private translate = inject(TranslateService);

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
    area: '45,000 متر مربع',
    areaEn: '45,000 sq m',
    year: '2024',
    client: 'وزارة الإسكان',
    clientEn: 'Ministry of Housing',
    description: '',
    descriptionEn: '',
    image: ''
  };

  // ✅ getter للاستخدام في الـ template بدل string concatenation
  get heroBgImage(): string {
    return `url("${this.project.image}")`;
  }

  breadcrumbItems: any[] = [];

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id') || 'p1';
    this.baseProject = PROJECTS.find(p => p.id === this.projectId) || PROJECTS[0];

    this.project.id = this.baseProject.id;
    this.project.image = this.baseProject.image;
    this.project.statusClass = this.baseProject.status === 'done' ? 'status-done' : 'status-progress';

    // ✅ انتظر الترجمة تتحمل الأول
    this.translate.get(`projects_page.items.${this.baseProject.key}.title`).subscribe(() => {
      this.updateContent();
    });

    this.translate.onLangChange.subscribe(() => {
      this.updateContent();
    });
  }

  updateContent() {
    const key = this.baseProject.key;
    const cat = this.baseProject.categoryKey;
    const isAr = this.langService.currentLang() === 'ar';

    const title = this.translate.instant(`projects_page.items.${key}.title`);
    const desc = this.translate.instant(`projects_page.items.${key}.desc`);
    const region = this.translate.instant(`projects_page.items.${key}.region`);
    const service = this.translate.instant(`projects_page.categories.${cat}`);
    const statusLabel = this.translate.instant(
      this.baseProject.status === 'done' ? 'projects_page.status_done' : 'projects_page.status_progress'
    );

    if (isAr) {
      this.project.name = title;
      this.project.description = desc;
      this.project.city = region;
      this.project.serviceType = service;
      this.project.status = statusLabel;
    } else {
      this.project.nameEn = title;
      this.project.descriptionEn = desc;
      this.project.cityEn = region;
      this.project.serviceTypeEn = service;
      this.project.statusEn = statusLabel;
    }

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