import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, ChildrenOutletContexts } from '@angular/router';
import { Navbar } from './shared/components/navbar';
import { ThemeService } from './core/services/theme';
import { LanguageService } from './core/services/language';
import { Footer } from "./shared/components/footer";
import { routeAnimations } from './core/animations/route-animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [routeAnimations]
})
export class App implements OnInit {
  private contexts = inject(ChildrenOutletContexts);

  constructor(
    private themeService: ThemeService,
    private langService: LanguageService
  ) { }

  ngOnInit() {
    this.themeService.init();
    this.langService.init();
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}