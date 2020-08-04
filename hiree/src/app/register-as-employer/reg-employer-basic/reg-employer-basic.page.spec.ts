import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegEmployerBasicPage } from './reg-employer-basic.page';

describe('RegEmployerBasicPage', () => {
  let component: RegEmployerBasicPage;
  let fixture: ComponentFixture<RegEmployerBasicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegEmployerBasicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegEmployerBasicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
