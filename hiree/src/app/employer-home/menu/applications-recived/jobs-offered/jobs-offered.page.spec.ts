import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobsOfferedPage } from './jobs-offered.page';

describe('JobsOfferedPage', () => {
  let component: JobsOfferedPage;
  let fixture: ComponentFixture<JobsOfferedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsOfferedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobsOfferedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
