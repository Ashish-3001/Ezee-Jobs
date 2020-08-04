import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EyeeShortlistedPage } from './eyee-shortlisted.page';

describe('EyeeShortlistedPage', () => {
  let component: EyeeShortlistedPage;
  let fixture: ComponentFixture<EyeeShortlistedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EyeeShortlistedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EyeeShortlistedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
