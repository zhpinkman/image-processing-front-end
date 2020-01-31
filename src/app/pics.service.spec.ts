import { TestBed } from '@angular/core/testing';

import { PicsService } from './pics.service';

describe('PicsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PicsService = TestBed.get(PicsService);
    expect(service).toBeTruthy();
  });
});
