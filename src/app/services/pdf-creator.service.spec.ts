import { TestBed } from '@angular/core/testing';

import { PdfCreatorService } from './pdf-creator.service';

describe('PdfCreatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdfCreatorService = TestBed.get(PdfCreatorService);
    expect(service).toBeTruthy();
  });
});
