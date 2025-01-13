import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule
import { HttpClientModule } from '@angular/common/http';
import { CreateRoomComponent } from './create-room.component';
import { ServRoomService } from '../../../services/servroom/servroom.service'; 

describe('CreateRoomComponent', () => {
  let component: CreateRoomComponent;
  let fixture: ComponentFixture<CreateRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, HttpClientModule, CreateRoomComponent ], // Asegúrate de importar BrowserAnimationsModule aquí
      providers: [ ServRoomService ] // Proporciona el servicio aquí
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
