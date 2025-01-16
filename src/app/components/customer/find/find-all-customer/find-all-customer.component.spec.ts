import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAllCustomerComponent } from './find-all-customer.component';

describe('FindAllCustomerComponent', () => {
  let component: FindAllCustomerComponent;
  let fixture: ComponentFixture<FindAllCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindAllCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindAllCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
