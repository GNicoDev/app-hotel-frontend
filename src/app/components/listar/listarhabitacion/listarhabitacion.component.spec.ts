import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarhabitacionComponent } from './listarhabitacion.component';

describe('ListarhabitacionComponent', () => {
  let component: ListarhabitacionComponent;
  let fixture: ComponentFixture<ListarhabitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarhabitacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarhabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
