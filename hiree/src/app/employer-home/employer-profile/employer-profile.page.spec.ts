import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmployerProfilePage } from './employer-profile.page';

describe('EmployerProfilePage', () => {
  let component: EmployerProfilePage;
  let fixture: ComponentFixture<EmployerProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployerProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
