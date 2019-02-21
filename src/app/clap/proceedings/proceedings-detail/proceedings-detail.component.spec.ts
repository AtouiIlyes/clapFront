import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedingsDetailComponent } from './proceedings-detail.component';

describe('ProceedingsDetailComponent', () => {
  let component: ProceedingsDetailComponent;
  let fixture: ComponentFixture<ProceedingsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProceedingsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceedingsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
