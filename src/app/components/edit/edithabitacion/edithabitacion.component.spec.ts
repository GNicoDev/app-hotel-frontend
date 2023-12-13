import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdithabitacionComponent } from './edithabitacion.component';

describe('EdithabitacionComponent', () => {
  let component: EdithabitacionComponent;
  let fixture: ComponentFixture<EdithabitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdithabitacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdithabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
