import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { ServRoomService } from './servroom.service'; 

describe('ServRoomService', () => {
  let service: ServRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ], // Asegúrate de importar HttpClientModule aquí
      providers: [ ServRoomService ] // Proporciona el servicio aquí
    });
    service = TestBed.inject(ServRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
