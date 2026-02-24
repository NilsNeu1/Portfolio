import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [MatIconModule, NgForOf],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {

  skills = [
    {icon: '../../assets/Frontend_Skills_icons/HTML.svg', label: 'HTML' },
    {icon: '../../assets/Frontend_Skills_icons/CSS.svg', label: 'CSS' },
    {icon: '../../assets/Frontend_Skills_icons/Javascript.svg', label: 'JavaScript' },
    {icon: '../../assets/Frontend_Skills_icons/Typescript.svg', label: 'TypeScript' },
    {icon: '../../assets/Frontend_Skills_icons/Angular.svg', label: 'Angular' },
    // {icon: '../../assets/Frontend_Skills_icons/Firebase.svg', label: 'Firebase' },
    {icon: '../../assets/Frontend_Skills_icons/Git.svg', label: 'Git' },
    {icon: '../../assets/Frontend_Skills_icons/Rest_Api.svg', label: 'REST-API' },
    {icon: '../../assets/Frontend_Skills_icons/Material_Design.svg', label: 'Material Design' },
    {icon: '../../assets/Frontend_Skills_icons/Scrum.svg', label: 'Scrum' },
  ]


}
