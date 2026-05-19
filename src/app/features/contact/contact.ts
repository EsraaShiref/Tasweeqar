import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChildren,
  QueryList,
  ElementRef,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language';
import { EmailService } from '../../core/services/emailjs.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('animatedEl') animatedElements!: QueryList<ElementRef>;

  // ── Services ──────────────────────────────────────────────────────────────
  protected langService = inject(LanguageService);
  private emailService = inject(EmailService);
  private seoService = inject(SeoService);

  private observer!: IntersectionObserver;

  get isRtl() {
    return this.langService.currentLang() === 'ar';
  }

  // ── Form model ────────────────────────────────────────────────────────────
  form = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  // ── UI state ──────────────────────────────────────────────────────────────
  sending = false;
  submitted = false;
  hasError = false;

  // ── Lifecycle ─────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.seoService.setPage(
      {
        title: 'تواصل معنا | تسويقار',
        description: 'تواصل مع تسويقار للمقاولات العامة اليوم لمناقشة مشروعك والحصول على استشارة متخصصة.',
      },
      {
        title: 'Contact Us | Tasweeqar',
        description: 'Contact Tasweeqar General Contracting today to discuss your project and get an expert consultation.',
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

  // ── Submit — delegates to EmailService ────────────────────────────────────
  onSubmit(): void {
    this.sending = true;
    this.hasError = false;

    this.emailService
      .sendContactEmail({
        name: this.form.name,
        email: this.form.email,
        phone: this.form.subject, // subject used as extra field; service maps it via templateParams
        message: this.form.message,
      })
      .then(() => {
        this.submitted = true;
        this.form = { name: '', email: '', subject: '', message: '' };
      })
      .catch(() => {
        this.hasError = true;
      })
      .finally(() => {
        this.sending = false;
      });
  }

  // ── Reset ─────────────────────────────────────────────────────────────────
  resetForm(): void {
    this.submitted = false;
    this.hasError = false;
    this.form = { name: '', email: '', subject: '', message: '' };
  }
}
