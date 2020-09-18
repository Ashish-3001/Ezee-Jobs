import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditEyeePage } from './edit-eyee.page';

describe('EditEyeePage', () => {
  let component: EditEyeePage;
  let fixture: ComponentFixture<EditEyeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEyeePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditEyeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
