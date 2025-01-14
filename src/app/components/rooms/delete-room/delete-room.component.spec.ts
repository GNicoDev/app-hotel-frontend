import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { DeleteRoomComponent } from './delete-room.component';
import { ServRoomService } from '../../../services/servroom/servroom.service'; 
import { HttpClientModule } from '@angular/common/http';


describe('DeleteRoomComponent', () => {
  let component: DeleteRoomComponent;
  let fixture: ComponentFixture<DeleteRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRoomComponent, HttpClientModule,BrowserAnimationsModule],
      providers: [ServRoomService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
