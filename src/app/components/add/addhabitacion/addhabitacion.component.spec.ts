import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddhabitacionComponent } from './addhabitacion.component';

describe('AddhabitacionComponent', () => {
  let component: AddhabitacionComponent;
  let fixture: ComponentFixture<AddhabitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddhabitacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddhabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
