import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { GetService } from '../servvices/get.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../servvices/authentication.service';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.page.html',
  styleUrls: ['./employee-home.page.scss'],
})
export class EmployeeHomePage implements OnInit {
  public selectedIndex = [];
  

  k:number =0;
  fav: object = [{ }];
  eyee_details:any;
  results_job: any;
  test:any ="";
  search_state:boolean = false;

  constructor(
    public menuCtrl: MenuController,
    private get: GetService,
    private http: HttpClient,
    private authService: AuthenticationService) 
  { 


  }

  ngOnInit() {
    
  }

  like(f, a) {
    for(var i=0; i<this.k;i++) {
      if(this.fav[i]){
        if(this.fav[i].job_id == f) {
          var pacthdata = {
            unliked: false,
          }
          this.http.patch(`http://tekhab.pythonanywhere.com/EmployeeDetailsFav/${this.fav[i].id}/`, pacthdata).subscribe( () => { });
          this.selectedIndex.push(f);
          return;
        }
      }
    }
    var postdata = {
      eyee_id: this.eyee_details.id,
      eyee_name: this.eyee_details.eyee_name,
      job_id: f,
      job_post: this.results_job[a].job_post,
    }
    this.http.post('http://tekhab.pythonanywhere.com/EmployeeDetailsFav/', postdata).subscribe( (value:any) => {
      this.http.get(`http://tekhab.pythonanywhere.com/EmployeeDetailsFav/?eyee_id=${this.eyee_details.id}`).subscribe( (data:any) => {
        this.fav = data;
        this.selectedIndex.push(value.job_id);
      });
      this.k++;
    });
  }

  dislike(f) {
    for(var i=0; i<this.k;i++) {
      if(this.fav[i]) {
        if(this.fav[i].job_id == f) {
          var pacthdata = {
            unliked: true,
          }
          this.http.patch(`http://tekhab.pythonanywhere.com/EmployeeDetailsFav/${this.fav[i].id}/`, pacthdata).subscribe( () => { });
          const index = this.selectedIndex.indexOf(f);
          if (index > -1) {
            this.selectedIndex.splice(index, 1);
          }
        }
      }
    }
  }

  update(id) {
    this.http.get(`http://tekhab.pythonanywhere.com/JobPost/${id}/`).subscribe( (data:any) => {
      var pacthjob = {
        job_post_opened: ++data.job_post_opened,
      }
      this.http.patch(`http://tekhab.pythonanywhere.com/JobPost/${id}/`, pacthjob).subscribe( () => { });
    });

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true); 
  }

  ionViewDidEnter() {
    this.authService.data.then((value:any) => {
      this.eyee_details = value;
      var eyee_choice:any;
      if(this.test.toLowerCase() == "manager" || 
        this.test.toLowerCase() == "chef" || 
        this.test.toLowerCase() == "janitor" ||
        this.test.toLowerCase() == "bartender" ||
        this.test.toLowerCase() == "delivery person" ||
        this.test.toLowerCase() == "receptionist" ||
        this.test.toLowerCase() == "waiter" ) {
        eyee_choice = this.test;
      }
      else {
        eyee_choice = value.eyee_choice;
      }
      this.get.get_job_post(eyee_choice,
        value.eyee_salary_expected,
        value.eyee_address_2,
        value.eyee_education,
        value.eyee_age,
        value.eyee_gender,
        value.eyee_pre_experience,
        value.eyee_type_hotel,
        this.test,
        this.eyee_details.id).then((res:any) => {
        this.results_job = this.get.results_job_post;
        this.http.get(`http://tekhab.pythonanywhere.com/EmployeeDetailsFav/?eyee_id=${this.eyee_details.id}&unliked=`).subscribe( (data:any) => {
          this.fav = data;
          for(var i=0; i>=0;i++) {
            if(this.fav[i]) {
              if(this.fav[i].unliked == false) {
                this.selectedIndex.push(this.fav[i].job_id);
              }
              this.k++;
            }
            else {
              break;
            }
          }
        });
      });
    });
  }

  tset(search:string) {
    this.search_state = !this.search_state;
    this.test = search;
    this.ionViewDidEnter();
  }
}
