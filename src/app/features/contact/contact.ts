import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Breadcrumb } from '../../shared/components/breadcrumb/breadcrumb';
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
  imports: [CommonModule, NgIf, FormsModule, TranslateModule, Breadcrumb],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class Contact implements OnInit, AfterViewInit {
  @ViewChildren('animatedEl') animatedElements!: QueryList<ElementRef>;

  // ── Language ──────────────────────────────────────────────────────────────
  currentLang = 'ar';
  get isRtl() { return this.currentLang === 'ar'; }

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
  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang || 'ar';
    this.translate.onLangChange.subscribe(e => this.currentLang = e.lang);
  }

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
      .catch(err => {
        console.error('EmailJS error:', err);
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