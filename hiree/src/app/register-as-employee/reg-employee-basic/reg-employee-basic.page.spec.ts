import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegEmployeeBasicPage } from './reg-employee-basic.page';

describe('RegEmployeeBasicPage', () => {
  let component: RegEmployeeBasicPage;
  let fixture: ComponentFixture<RegEmployeeBasicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegEmployeeBasicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegEmployeeBasicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
