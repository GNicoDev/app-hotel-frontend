import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { ServCustomerService } from './servcustomer.service';

describe('ServcustomerService', () => {
  let service: ServCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ], // Asegúrate de importar HttpClientModule aquí
      providers: [ ServCustomerService ] // Proporciona el servicio aquí
    });
    service = TestBed.inject(ServCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
