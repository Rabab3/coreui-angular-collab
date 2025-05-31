import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesContributionsComponent } from './mes-contributions.component';

describe('MesContributionsComponent', () => {
  let component: MesContributionsComponent;
  let fixture: ComponentFixture<MesContributionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesContributionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesContributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
