import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequirementsPagePage } from './requirements-page.page';

describe('RequirementsPagePage', () => {
  let component: RequirementsPagePage;
  let fixture: ComponentFixture<RequirementsPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementsPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequirementsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
