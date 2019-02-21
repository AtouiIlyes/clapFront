import { TestBed } from '@angular/core/testing';

import { ProceedingsService } from './proceedings.service';

describe('ProceedingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProceedingsService = TestBed.get(ProceedingsService);
    expect(service).toBeTruthy();
  });
});
