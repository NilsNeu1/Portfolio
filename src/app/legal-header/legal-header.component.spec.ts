import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalHeaderComponent } from './legal-header.component';

describe('LegalHeaderComponent', () => {
  let component: LegalHeaderComponent;
  let fixture: ComponentFixture<LegalHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
