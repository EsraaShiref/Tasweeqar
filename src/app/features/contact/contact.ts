import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  QueryList,
  ViewChildren,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class Contact implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('animatedEl') animatedElements!: QueryList<ElementRef>;

  currentLang = 'ar';
  isRtl = true;

  // Form model
  form = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  submitted = false;
  sending = false;

  private langSub!: Subscription;

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang || 'ar';
    this.isRtl = this.currentLang === 'ar';

    this.langSub = this.translate.onLangChange.subscribe((e) => {
      this.currentLang = e.lang;
      this.isRtl = e.lang === 'ar';
    });
  }

  ngAfterViewInit(): void {
    this.observeElements();
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  onSubmit(): void {
    if (!this.form.name || !this.form.email || !this.form.message) return;

    this.sending = true;
    // Simulate async send
    setTimeout(() => {
      this.sending = false;
      this.submitted = true;
      this.form = { name: '', email: '', subject: '', message: '' };
    }, 1200);
  }

  resetForm(): void {
    this.submitted = false;
  }

  private observeElements(): void {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in-view');
        }),
      { threshold: 0.12 }
    );
    this.animatedElements.forEach((el) => observer.observe(el.nativeElement));
  }
}