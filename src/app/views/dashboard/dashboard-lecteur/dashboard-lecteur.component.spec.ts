import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLecteurComponent } from './dashboard-lecteur.component';

describe('DashboardLecteurComponent', () => {
  let component: DashboardLecteurComponent;
  let fixture: ComponentFixture<DashboardLecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLecteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardLecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
