import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletehabitacionComponent } from './deletehabitacion.component';

describe('DeletehabitacionComponent', () => {
  let component: DeletehabitacionComponent;
  let fixture: ComponentFixture<DeletehabitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletehabitacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletehabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
