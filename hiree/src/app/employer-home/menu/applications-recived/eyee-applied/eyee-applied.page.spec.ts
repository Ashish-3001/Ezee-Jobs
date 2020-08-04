import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EyeeAppliedPage } from './eyee-applied.page';

describe('EyeeAppliedPage', () => {
  let component: EyeeAppliedPage;
  let fixture: ComponentFixture<EyeeAppliedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EyeeAppliedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EyeeAppliedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
