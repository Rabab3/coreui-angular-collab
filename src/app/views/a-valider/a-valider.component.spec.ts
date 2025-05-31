import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AValiderComponent } from './a-valider.component';

describe('AValiderComponent', () => {
  let component: AValiderComponent;
  let fixture: ComponentFixture<AValiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AValiderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AValiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
