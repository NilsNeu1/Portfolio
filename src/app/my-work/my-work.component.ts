import { Component, Input} from '@angular/core';
import { NgFor } from '@angular/common';
import { ObserveSectionDirective } from '../services/section-observer/section.observer.directive';

@Component({
  selector: 'app-my-work',
  standalone: true,
  imports: [ObserveSectionDirective, NgFor],
  templateUrl: './my-work.component.html',
  styleUrl: './my-work.component.scss'
})
export class MyWorkComponent {
  sectionId = 'projects';
  currentIndex = 0;

  projects = [
    {
      name: "El Pollo Loco",
      icon: "../../assets/general/Project_emoji/Pollo_loco_D.svg",
      snapshot: "../../assets/project_screenshots/el_pollo_loco.png",
      technologies: ["HTML", "CSS", "Javascript"],
      description: "A simple Jump-and-Run game based on an object-oriented approach. Help Pepe to defeat his enemies and collect Coins",
      github: "",
      redirect:"",
      color: "",
    },
    {
      name: "Join",
      icon: 'url()',
      snapshot: "",
      technologies: ["HTML", "CSS", "TypeScript", "Angular"],
      description: "A Task-manager inspired by the Kanban System. ",
      github: "",
      redirect:""
    },
  ];


nextProject() {
  this.currentIndex = (this.currentIndex + 1) % this.projects.length;
  console.log(this.currentIndex);
}

prevProject() {
  this.currentIndex =
    (this.currentIndex - 1 + this.projects.length) % this.projects.length;
}


}
