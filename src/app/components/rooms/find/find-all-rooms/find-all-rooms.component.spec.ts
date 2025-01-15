import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAllRoomsComponent } from './find-all-rooms.component';

describe('FindAllComponent', () => {
  let component: FindAllRoomsComponent;
  let fixture: ComponentFixture<FindAllRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindAllRoomsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindAllRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
