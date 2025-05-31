import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ACorrigerComponent } from './a-corriger.component';

describe('ACorrigerComponent', () => {
  let component: ACorrigerComponent;
  let fixture: ComponentFixture<ACorrigerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ACorrigerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ACorrigerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
