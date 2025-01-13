import { TestBed } from '@angular/core/testing';

import { ServRoomService } from './servroom.service';

describe('ServhabitacionService', () => {
  let service: ServRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
