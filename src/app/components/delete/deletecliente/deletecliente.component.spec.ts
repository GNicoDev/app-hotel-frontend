import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteclienteComponent } from './deletecliente.component';

describe('DeleteclienteComponent', () => {
  let component: DeleteclienteComponent;
  let fixture: ComponentFixture<DeleteclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteclienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
