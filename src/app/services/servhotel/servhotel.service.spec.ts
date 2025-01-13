import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { ServhotelService } from './servhotel.service';

describe('ServhotelService', () => {
  let service: ServhotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ], // Asegúrate de importar HttpClientModule aquí
      providers: [ ServhotelService ] // Proporciona el servicio aquí
    });
    service = TestBed.inject(ServhotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

