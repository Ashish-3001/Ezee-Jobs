import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterAsEmployeePage } from './register-as-employee.page';

describe('RegisterAsEmployeePage', () => {
  let component: RegisterAsEmployeePage;
  let fixture: ComponentFixture<RegisterAsEmployeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAsEmployeePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterAsEmployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
