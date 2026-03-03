import { Component, Input } from '@angular/core';
import { ObserveSectionDirective } from '../services/section-observer/section.observer.directive';
import { url } from 'node:inspector';

@Component({
  selector: 'app-my-work',
  standalone: true,
  imports: [ObserveSectionDirective],
  templateUrl: './my-work.component.html',
  styleUrl: './my-work.component.scss'
})
export class MyWorkComponent {
  sectionId = 'projects';

  projects = [
    {
      name: "El Pollo Loco",
      icon: "../../assets/general/Project_emoji/Pollo_loco_D.svg",
      snapshot: "",
      technologies: ["HTML", "CSS", "Javascript"],
      description: "A simple Jump-and-Run game based on an object-oriented approach. Help Pepe to defeat his enemies and collect Coins",
      github: "",
      redirect:""
    },
    {
      name: "Join",
      icon: url(),
      snapshot: "",
      technologies: ["HTML", "CSS", "TypeScript", "Angular"],
      description: "A Task-manager inspired by the Kanban System. ",
      github: "",
      redirect:""
    },
  ];

}
