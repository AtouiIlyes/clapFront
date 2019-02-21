import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedingsListComponent } from './proceedings-list.component';

describe('ProceedingsListComponent', () => {
  let component: ProceedingsListComponent;
  let fixture: ComponentFixture<ProceedingsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProceedingsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceedingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
