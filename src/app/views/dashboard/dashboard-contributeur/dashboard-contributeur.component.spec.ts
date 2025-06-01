import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardContributeurComponent } from './dashboard-contributeur.component';

describe('DashboardContributeurComponent', () => {
  let component: DashboardContributeurComponent;
  let fixture: ComponentFixture<DashboardContributeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardContributeurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardContributeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
