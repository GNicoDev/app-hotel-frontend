import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindclienteComponent } from './findcliente.component';

describe('FindclienteComponent', () => {
  let component: FindclienteComponent;
  let fixture: ComponentFixture<FindclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindclienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
