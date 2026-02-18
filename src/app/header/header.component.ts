import { Component } from '@angular/core';
//import { NgIf } from "../../../node_modules/@angular/common/index";
//import { MatIcon } from "@angular/material/icon";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
isMenuOpen: boolean = false;
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
