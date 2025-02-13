import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAllUsersComponent } from './find-all-users.component';

describe('FindAllUsersComponent', () => {
  let component: FindAllUsersComponent;
  let fixture: ComponentFixture<FindAllUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindAllUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindAllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
