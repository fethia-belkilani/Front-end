import { TestBed } from '@angular/core/testing';

import { ImputationService } from './imputation.service';

describe('ImputationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImputationService = TestBed.get(ImputationService);
    expect(service).toBeTruthy();
  });
});
