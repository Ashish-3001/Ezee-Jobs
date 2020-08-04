import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobOfferPage } from './job-offer.page';

describe('JobOfferPage', () => {
  let component: JobOfferPage;
  let fixture: ComponentFixture<JobOfferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobOfferPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobOfferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
