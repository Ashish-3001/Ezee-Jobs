import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-eyee-applied',
  templateUrl: './eyee-applied.page.html',
  styleUrls: ['./eyee-applied.page.scss'],
})
export class EyeeAppliedPage implements OnInit {
  job_post_toggle: boolean = false;
  applied_jobs:any = [{ }];
  value: object = [{  }];
  n:number;
  eyee_no_accept:any;
  image:any;

  constructor(private acitivatedRoute: ActivatedRoute,
    public menuCtrl: MenuController, 
  private http: HttpClient,
  public alertController: AlertController,
  private router: Router) 
  { }

  ngOnInit() {
    this.acitivatedRoute.paramMap.subscribe(paraMap => {
      if(!paraMap.has('eyer_id')) {
        console.log('error');
        return
      }
      const job_id = paraMap.get('eyer_id');
      this.http.get(`http://tekhab.pythonanywhere.com/JobApplied/?job_id=${job_id}&job_active=true&short_listed=false`).subscribe( (value:any) => {
        this.value = value;
        var k: number = 0;
        for(value.id in value) {
          var j:number =0;
          this.http.get(`http://tekhab.pythonanywhere.com/EmployeeDetails/${value[k++].eyee_id}/`).subscribe( (data:any) => {
            this.applied_jobs[j++] = data;
            this.eyee_no_accept = data.eyee_no_accept;
          });
        }        
      });
    });
  }

  state(i) {
    this.job_post_toggle = !this.job_post_toggle;
    this.n = i;
    this.http.get(`http://tekhab.pythonanywhere.com/ImageEyeeDp/?eyee_id=${this.applied_jobs[this.n].id}`).subscribe((data: any) => {
      this.image = data[0].image_dp;
    });
  }

  accept() {
    var data = {
      job_active: false,
      short_listed: true,
    }
    var postdata ={
      job_id: this.value[this.n].job_id,
      eyee_id: this.value[this.n].eyee_id,
      short_list_type: "applied",
      short_list_type_id: this.value[this.n].id,
    }
    var pacth = {
      eyee_no_accept: ++this.eyee_no_accept,
    }
    this.http.patch(`http://tekhab.pythonanywhere.com/JobApplied/${this.value[this.n].id}/`, data ).subscribe( () =>{ });
    this.http.post('http://tekhab.pythonanywhere.com/ShortListed/', postdata).subscribe( () => { });
    this.http.patch(`http://tekhab.pythonanywhere.com/EmployeeDetails/${this.value[this.n].eyee_id}/`, pacth).subscribe( () => { });
  }

  reject() {
    var data = {
      job_active: false,
    }
    this.http.patch(`http://tekhab.pythonanywhere.com/JobApplied/${this.value[this.n].id}/`, data ).subscribe( () =>{ });
  }
  async presentAlertAccept() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you <strong>Sure</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Accept',
          handler: () => {
            this.accept();
            this.router.navigate(['/employer-profile/employer-home/menu/apllication-status/', this.value[this.n].job_id]);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertReject() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Reject!',
      message: 'Are you <strong>Sure</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Reject',
          handler: () => {
            this.reject();
            this.router.navigate(['/employer-profile/employer-home/menu/apllication-status/', this.value[this.n].job_id]);
          }
        }
      ]
    });

    await alert.present();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
}
