import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditEyerPage } from './edit-eyer.page';

describe('EditEyerPage', () => {
  let component: EditEyerPage;
  let fixture: ComponentFixture<EditEyerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEyerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditEyerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
