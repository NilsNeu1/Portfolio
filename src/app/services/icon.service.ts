import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(
    private registry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.registerIcons();
  }

  private registerIcons() {
    this.addIcon('dev-logo', 'assets/logo/dev_logo.svg');
    this.addIcon('flower', 'assets/logo/flower_dark.svg');
    this.addIcon('menu', 'assets/Header/Menu/burger_menu.svg');
    this.addIcon('nav-bullet-inactive', '/assets/nav_bullets/dot.svg');
    this.addIcon('nav-bullet-active', '/assets/nav_bullets/square.svg');
  }

  private addIcon(name: string, path: string) {
    this.registry.addSvgIcon(
      name,
      this.sanitizer.bypassSecurityTrustResourceUrl(path)
    );
  }
}
