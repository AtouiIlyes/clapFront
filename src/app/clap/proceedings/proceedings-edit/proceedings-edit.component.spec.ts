import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedingsEditComponent } from './proceedings-edit.component';

describe('ProceedingsEditComponent', () => {
  let component: ProceedingsEditComponent;
  let fixture: ComponentFixture<ProceedingsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProceedingsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceedingsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
