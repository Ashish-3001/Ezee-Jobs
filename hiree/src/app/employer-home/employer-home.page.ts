import { Component, OnInit, Injectable, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';
import { GetService } from '../servvices/get.service';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from '../servvices/authentication.service';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Injectable()
@Component({
  selector: 'app-folder',
  templateUrl: './employer-home.page.html',
  styleUrls: ['./employer-home.page.scss'],
})
export class FolderPage implements OnInit {
  public selectedIndex = [];
  public test1 = [];
  public folder: string;
  job_post_toggle: boolean = false;
  
  k:number =0;
  fav: object = [{ }];
  active_job_post:any;
  public active_job_post_name:any=[];
  eyer_details:any;
  test:any;
  results: any;
  

  constructor(private activatedRoute: ActivatedRoute, 
    public menuCtrl: MenuController,
    public get: GetService,
    private http: HttpClient,
    private authService: AuthenticationService,
    public alertController: AlertController,
    private platform: Platform,
    private callNumber: CallNumber) 
  { 
    
  }

  ngOnInit() {
    this.get.job_post_state.subscribe( (number) => {
      this.active_job_post_name = [];
      this.authService.data.then((value:any) => {
        this.eyer_details = value;
        this.http.get(`http://tekhab.pythonanywhere.com/JobPost/?eyer_id=${value.id}&job_active=true`).subscribe( (value:any) => {
          for(var i=0;i<3;i++) {
            if(value[i]) {
              if(this.active_job_post_name.includes(value[i].job_post) == false) {
                this.active_job_post_name.push(value[i].job_post);
              }
            }
            else {
              break;
            }
          }
          this.active_job_post = value[this.get.job_post_state.value];
          this.get.get_employee(this.active_job_post.job_post,
            this.active_job_post.job_salary,
            this.active_job_post.job_experience,
            this.active_job_post.job_education,
            this.active_job_post.eyer_location,
            this.active_job_post.job_age,
            this.active_job_post.job_gender,
            this.eyer_details.id).then( (res) => {
            this.results = this.get.results_eyee_details;
            console.log(this.results);
            console.log("hey");
            this.test = this.get.image_eyee;
            this.http.get(`http://tekhab.pythonanywhere.com/EmployerDetailsFav/?eyer_id=${this.eyer_details.id}`).subscribe( (data:any) => {
              this.fav = data;
              for(var i=0; i>=0;i++) {
                if(this.fav[i]) {
                  if(this.fav[i].unliked == false) {
                    this.selectedIndex.push(this.fav[i].eyee_id);
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
      });
    });
  }

  state(n:number) {
    this.job_post_toggle = !this.job_post_toggle;
    console.log(this.results);
    if(n == 0 || n == 1 || n == 2) {
      this.get.job_post_state.next(n);
    }
  }
 
  like(f, a) {
    for(var i=0; i<this.k;i++) {
      if(this.fav[i].eyee_id == f) {
        
        var pacthdata = {
          unliked: false,
        }
        this.http.patch(`http://tekhab.pythonanywhere.com/EmployerDetailsFav/${this.fav[i].id}/`, pacthdata).subscribe( () => { });
        this.selectedIndex.push(f);
        return;
      }
    }
    var postdata = {
      eyer_id: this.eyer_details.id,
      eyer_name: this.eyer_details.eyer_hotel_name,
      eyee_id: f,
      eyee_name: this.results[a].eyee_name,
    }
    this.http.post('http://tekhab.pythonanywhere.com/EmployerDetailsFav/', postdata).subscribe( (value:any) => {
      this.http.get(`http://tekhab.pythonanywhere.com/EmployerDetailsFav/?eyer_id=${this.eyer_details.id}`).subscribe( (data:any) => {
        this.fav = data;
        this.selectedIndex.push(value.eyee_id);
      });
      this.k++;
    });
  }

  dislike(f) {
    for(var i=0; i<this.k;i++) {
      if(this.fav[i].eyee_id == f) {
        var pacthdata = {
          unliked: true,
        }
        this.http.patch(`http://tekhab.pythonanywhere.com/EmployerDetailsFav/${this.fav[i].id}/`, pacthdata).subscribe( () => { });
        const index = this.selectedIndex.indexOf(f);
        if (index > -1) {
          this.selectedIndex.splice(index, 1);
        }
      }
    }
  }


  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  async presentAlertJobMax() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Max Limit !',
      message: "Can't have more than <strong>3 Active</strong> Jobs post at a time!! Please delete 1 of your active job post to add",
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    });

    await alert.present();
  }


  async presentAlertCallNow(phoneNum) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Connect Call',
      message: 'This call may be recorded for <strong>Security</strong> purpose...Please Refrain from using foul language ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Processed',
          handler: () => {
            this.callNow(phoneNum);
          }
        }
      ]
    });

    await alert.present();
  }


  callNow(phoneNum) {
    this.callNumber.callNumber(phoneNum, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
}
