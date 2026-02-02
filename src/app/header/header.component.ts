import { Component } from '@angular/core';
import { NgIf } from "../../../node_modules/@angular/common/index";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
isMenuOpen = false;
activeLanguage = 'DE';
langAnimate = false;

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
