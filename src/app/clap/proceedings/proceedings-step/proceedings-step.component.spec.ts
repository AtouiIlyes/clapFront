import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedingsStepComponent } from './proceedings-step.component';

describe('ProceedingsStepComponent', () => {
  let component: ProceedingsStepComponent;
  let fixture: ComponentFixture<ProceedingsStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProceedingsStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceedingsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
