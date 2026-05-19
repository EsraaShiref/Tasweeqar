import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environments';


// ─── EmailJS credentials ────────────────────────────────────────────────────
const EJS_SERVICE_ID = environment.emailjs.serviceId;
const EJS_TEMPLATE_ID = environment.emailjs.templateId;
const EJS_PUBLIC_KEY = environment.emailjs.publicKey;
// ────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class Contact implements AfterViewInit {
  @ViewChildren('animatedEl') animatedElements!: QueryList<ElementRef>;

  // ── Language ──────────────────────────────────────────────────────────────
  protected langService = inject(LanguageService);
  get isRtl() { return this.langService.currentLang() === 'ar'; }

  // ── Form model (matches [(ngModel)]="form.xxx" in the HTML) ───────────────
  form = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  // ── UI state (matches *ngIf names used in the HTML) ───────────────────────
  sending = false;   // spinner on button
  submitted = false;   // shows success panel
  hasError = false;   // shows error message

  // ─────────────────────────────────────────────────────────────────────────




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

  // ── Submit ────────────────────────────────────────────────────────────────
  onSubmit(): void {
    this.sending = true;
    this.hasError = false;

    const templateParams = {
      from_name: this.form.name,
      reply_to: this.form.email,
      subject: this.form.subject || '(no subject)',
      message: this.form.message,
    };

    emailjs
      .send(EJS_SERVICE_ID, EJS_TEMPLATE_ID, templateParams, EJS_PUBLIC_KEY)
      .then(() => {
        this.submitted = true;          // show success panel
        this.form = { name: '', email: '', subject: '', message: '' };
      })
      .catch(() => {
        this.hasError = true;
      })
      .finally(() => {
        this.sending = false;
      });
  }

  // ── Reset (back to empty form) ────────────────────────────────────────────
  resetForm(): void {
    this.submitted = false;
    this.hasError = false;
    this.form = { name: '', email: '', subject: '', message: '' };
  }
}