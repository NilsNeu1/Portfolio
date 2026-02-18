import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {

isHovered: boolean = false;

onHoverStart(){
this.isHovered = true;

}

onHoverEnd(){
this.isHovered = false;

}

}
