import { TestBed } from '@angular/core/testing';

import { BarcodegenService } from './barcodegen.service';

describe('BarcodegenService', () => {
  let service: BarcodegenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarcodegenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
