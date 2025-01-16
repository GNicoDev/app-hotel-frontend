import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindRoomByNumberComponent } from './find-room-by-number.component';

describe('FindRoomByNumberComponent', () => {
  let component: FindRoomByNumberComponent;
  let fixture: ComponentFixture<FindRoomByNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindRoomByNumberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindRoomByNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
