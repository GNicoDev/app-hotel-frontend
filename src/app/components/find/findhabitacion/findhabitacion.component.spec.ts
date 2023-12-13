import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindhabitacionComponent } from './findhabitacion.component';

describe('FindhabitacionComponent', () => {
  let component: FindhabitacionComponent;
  let fixture: ComponentFixture<FindhabitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindhabitacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindhabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
