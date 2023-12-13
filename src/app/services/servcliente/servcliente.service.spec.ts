import { TestBed } from '@angular/core/testing';

import { ServclienteService } from './servcliente.service';

describe('ServclienteService', () => {
  let service: ServclienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServclienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
