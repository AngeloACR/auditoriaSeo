import { TestBed } from '@angular/core/testing';

import { PagespeedService } from './pagespeed.service';

describe('PagespeedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PagespeedService = TestBed.get(PagespeedService);
    expect(service).toBeTruthy();
  });
});
