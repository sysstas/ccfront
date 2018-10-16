import { TestBed, inject } from '@angular/core/testing';

import { MastersService } from './masters.service';

describe('MastersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MastersService]
    });
  });

  it('should be created', inject([MastersService], (service: MastersService) => {
    expect(service).toBeTruthy();
  }));
});
