import { TestBed } from '@angular/core/testing';

import { DataforseoService } from './dataforseo.service';

describe('DataforseoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataforseoService = TestBed.get(DataforseoService);
    expect(service).toBeTruthy();
  });
});
