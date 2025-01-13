import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule
import { HttpClientModule } from '@angular/common/http';
import { EditRoomComponent } from './edit-room.component';
import { ServRoomService } from '../../../services/servroom/servroom.service'; 

describe('EditRoomComponent', () => {
  let component: EditRoomComponent;
  let fixture: ComponentFixture<EditRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, HttpClientModule, EditRoomComponent ], // Asegúrate de importar BrowserAnimationsModule aquí
      providers: [ ServRoomService ] // Proporciona el servicio aquí
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
