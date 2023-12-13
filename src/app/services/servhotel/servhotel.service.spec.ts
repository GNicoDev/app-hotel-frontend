import { TestBed } from '@angular/core/testing';

import { ServhotelService } from './servhotel.service';

describe('ServhotelService', () => {
  let service: ServhotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServhotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
