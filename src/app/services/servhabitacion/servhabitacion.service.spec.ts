import { TestBed } from '@angular/core/testing';

import { ServhabitacionService } from './servhabitacion.service';

describe('ServhabitacionService', () => {
  let service: ServhabitacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServhabitacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
