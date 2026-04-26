import { Component, Input} from '@angular/core';
import { NgFor } from '@angular/common';
import { ObserveSectionDirective } from '../services/section-observer/section.observer.directive';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-my-work',
  standalone: true,
  imports: [ObserveSectionDirective, NgFor, MatIcon],
  templateUrl: './my-work.component.html',
  styleUrl: './my-work.component.scss'
})
export class MyWorkComponent {
  sectionId = 'projects';
  currentIndex = 0;
  blue = "#679AAC";
  orange = "#F9AF42";
  darkorange = "#FF834F";

  projects = [
    {
      name: "El Pollo Loco",
      icon: "../../assets/general/Project_emoji/Pollo_loco_D.svg",
      snapshot: "../../assets/project_screenshots/el_pollo_loco.png",
      technologies: ["HTML", "CSS", "Javascript"],
      description: "A simple Jump-and-Run game based on an object-oriented approach. Help Pepe to defeat his enemies and collect Coins",
      github: "https://github.com/NilsNeu1/El-Pollo-Loco",
      redirect:"",
      bgColor: this.orange,
      spinnerColor: this.darkorange,
    },
    {
      name: "Join",
      icon: '../../assets/general/Project_emoji/Join_D.svg',
      snapshot: "../../assets/project_screenshots/join.svg",
      technologies: ["HTML", "CSS", "TypeScript", "Angular"],
      description: "A Task-manager inspired by the Kanban System created as a Group Project.",
      github: "https://github.com/NilsNeu1/Join",
      redirect:"",
      bgColor: this.darkorange,
      spinnerColor: this.orange,
    },
  ];


nextProject() {
  this.currentIndex = (this.currentIndex + 1) % this.projects.length;
}

prevProject() {
  this.currentIndex =
    (this.currentIndex - 1 + this.projects.length) % this.projects.length;
}


}
