import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardModerateurComponent } from './dashboard-moderateur.component';

describe('DashboardModerateurComponent', () => {
  let component: DashboardModerateurComponent;
  let fixture: ComponentFixture<DashboardModerateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardModerateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardModerateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
