import { Injectable, signal, computed } from '@angular/core';

export interface SectionInfo {
  id: string;
  darkUi: boolean;
}

@Injectable({ providedIn: 'root' })
export class VisibilityService {

  readonly sections: SectionInfo[] = [
    { id: 'hero',     darkUi: false },
    { id: 'about',    darkUi: true  },
    { id: 'skills',   darkUi: false },
    { id: 'projects', darkUi: true  },
    // { id: 'feedback', darkUi: false },
    { id: 'contact',  darkUi: false }
  ];

  // Signal für die aktive ID
  private _activeId = signal<string>(this.sections[0].id);
  readonly activeId = this._activeId.asReadonly();

  // Berechnet automatisch die Daten der aktiven Sektion [1, 2]
  readonly activeSectionData = computed(() => 
    this.sections.find(s => s.id === this._activeId()) || this.sections[0]
  );

  setActive(id: string) {
    if (this._activeId()!== id) {
      this._activeId.set(id);
    }
  }
}