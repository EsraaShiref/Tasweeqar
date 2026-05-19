import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, ChildrenOutletContexts } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { ThemeService } from './core/services/theme';
import { LanguageService } from './core/services/language';
import { Footer } from "./shared/components/footer/footer";
import { routeAnimations } from './core/animations/route-animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {
  // ── All dependencies via inject() — no constructor ──
  private contexts = inject(ChildrenOutletContexts);
  private themeService = inject(ThemeService);
  private langService = inject(LanguageService);

  ngOnInit(): void {
    this.themeService.init();
    this.langService.init();
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}