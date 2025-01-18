import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCustomerBypassportComponent } from './find-customer-bypassport.component';

describe('FindCustomerBypassportComponent', () => {
  let component: FindCustomerBypassportComponent;
  let fixture: ComponentFixture<FindCustomerBypassportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindCustomerBypassportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindCustomerBypassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
