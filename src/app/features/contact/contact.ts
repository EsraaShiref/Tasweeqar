import {
  Component,
  AfterViewInit,
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

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact implements AfterViewInit {
  @ViewChildren('animatedEl') animatedElements!: QueryList<ElementRef>;

  // ── Services ──────────────────────────────────────────────────────────────
  protected langService = inject(LanguageService);
  private emailService = inject(EmailService);

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
  ngAfterViewInit(): void {
    this.observeElements();
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
