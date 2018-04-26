import { TestBed, inject } from '@angular/core/testing';

import { UrlConstantsService } from './url-constants.service';

describe('UrlConstantsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlConstantsService]
    });
  });

  it('should be created', inject([UrlConstantsService], (service: UrlConstantsService) => {
    expect(service).toBeTruthy();
  }));
});
