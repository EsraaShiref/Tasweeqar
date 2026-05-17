import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar';
import { ThemeService } from './core/services/theme';
import { LanguageService } from './core/services/language';
import { Footer } from "./shared/components/footer";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  constructor(
    private themeService: ThemeService,
    private langService: LanguageService
  ) { }

  ngOnInit() {
    this.themeService.init();
    this.langService.init();
  }
}