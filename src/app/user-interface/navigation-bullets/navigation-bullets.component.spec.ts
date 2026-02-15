import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBulletsComponent } from './navigation-bullets.component';

describe('NavigationBulletsComponent', () => {
  let component: NavigationBulletsComponent;
  let fixture: ComponentFixture<NavigationBulletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBulletsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationBulletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
