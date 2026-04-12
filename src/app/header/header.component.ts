import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { VisibilityService } from '../services/section-observer/section-observer.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private visibilityService = inject(VisibilityService);

  isMenuOpen: boolean = false;
  activeLanguage = 'DE';
  langAnimate = false;

  // Get active section data from service
  activeSectionData = this.visibilityService.activeSectionData;

  // Computed signal for header styling based on active section
  headerColorClass = computed(() =>
    this.activeSectionData().darkUi ? 'dark-bg' : 'light-bg'
  );

  goToLink(url: string) {
  window.open(url, '_blank');
}


burgerMenuOpen(){
this.isMenuOpen = true;
}

burgerMenuClose(){
this.isMenuOpen = false;
}

languageSwitch(){
this.activeLanguage = this.activeLanguage === 'DE' ? 'EN' : 'DE';
this.langAnimate = true;
setTimeout(() => {
  this.langAnimate = false;
}, 300);
console.log('active language is', this.activeLanguage)
}

}
