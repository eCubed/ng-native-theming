// theme.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Theme {
  name: string;
  properties: any;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private storageKey = 'selectedTheme';
  private currentThemeSubject = new BehaviorSubject<Theme | null>(null);

  themes: Theme[] = [
    {
      name: 'light',
      properties: {
        '--background-color': '#efefff',
        '--text-color': '#000015',
        '--input-background': '#ababbb',
      },
    },
    {
      name: 'dark',
      properties: {
        '--background-color': '#000015',
        '--text-color': '#efefef',
        '--input-background': '#000050',
      },
    },
  ];

  currentTheme?: Theme | null;

  currentTheme$ = this.currentThemeSubject.asObservable();

  constructor() {
    const storedTheme = localStorage.getItem(this.storageKey);
    this.currentTheme = storedTheme
      ? this.themes.find((theme) => theme.name === storedTheme)
      : this.themes[0];
    this.applyTheme();
  }

  private applyTheme(): void {
    Object.keys(this.currentTheme!.properties).forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        this.currentTheme!.properties[property]
      );
    });
    this.currentThemeSubject.next(this.currentTheme!);
  }

  setTheme(themeName: string): void {
    const theme = this.themes.find((t) => t.name === themeName);

    if (theme) {
      this.currentTheme = theme;
      this.applyTheme();
      localStorage.setItem(this.storageKey, theme.name);
    }
  }

  toggleTheme(): void {
    const newTheme =
      this.currentTheme!.name === 'light' ? this.themes[1] : this.themes[0];
    this.setTheme(newTheme.name);
  }
}
