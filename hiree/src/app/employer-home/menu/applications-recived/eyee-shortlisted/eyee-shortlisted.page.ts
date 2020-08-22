import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/servvices/authentication.service';
import { AlertController, MenuController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-eyee-shortlisted',
  templateUrl: './eyee-shortlisted.page.html',
  styleUrls: ['./eyee-shortlisted.page.scss'],
})
export class EyeeShortlistedPage implements OnInit {
  job_post_toggle: boolean = false;
  applied_jobs:any = [{ }];
  value: object = [{  }];
  n:number;
  eyee_no_shortlisted:any;
  image:any;

  constructor(private acitivatedRoute: ActivatedRoute, 
  private http: HttpClient,
  private authService: AuthenticationService,
  public alertController: AlertController,
  public menuCtrl: MenuController,
  private router: Router,
  private callNumber: CallNumber) { }

  ngOnInit() {
    this.acitivatedRoute.paramMap.subscribe(paraMap => {
      if(!paraMap.has('eyer_id')) {
        console.log('error');
        return
      }
      const job_id = paraMap.get('eyer_id');
      this.http.get(`http://tekhab.pythonanywhere.com/ShortListed/?job_id=${job_id}&confirmed=false&job_active=true`).subscribe( (value:any) => {
        this.value = value;
        var k: number = 0;
        for(value.id in value) {
          var j:number =0;
          this.http.get(`http://tekhab.pythonanywhere.com/EmployeeDetails/${value[k++].eyee_id}/`).subscribe( (data:any) => {
            this.applied_jobs[j++] = data;
            this.eyee_no_shortlisted = data.eyee_no_shortlisted;
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
  
  confirm() {
    var data = {
      confirmed: true,
      job_active: false,
    }
    this.http.patch(`http://tekhab.pythonanywhere.com/ShortListed/${this.value[this.n].id}/`, data ).subscribe( () =>{ });
    var deletedata = {
      job_active: false,
    }
    this.http.patch(`http://tekhab.pythonanywhere.com/JobPost/${this.value[this.n].job_id}/`, deletedata ).subscribe( () =>{ });
    var pactheyee = {
      eyee_no_shortlisted: ++this.eyee_no_shortlisted,
    }
    this.http.patch(`http://tekhab.pythonanywhere.com/EmployeeDetails/${this.value[this.n].eyee_id}/`, pactheyee).subscribe( () => { });
    this.authService.data.then( (value) => {
      var pactheyer = {
        eyer_job_hier: ++value.eyer_job_hier,
      }
      this.http.patch(`http://tekhab.pythonanywhere.com/EmployerDetails/${this.value[this.n].eyee_id}/`, pactheyer).subscribe( () => { });
    });
  }

  reject() {
    var data = {
      job_active: false,
    }
    this.http.patch(`http://tekhab.pythonanywhere.com/ShortListed/${this.value[this.n].id}/`, data ).subscribe( () =>{ });
  }

  async presentAlertComfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you <strong>Sure</strong> He is the one!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'confirm',
          handler: () => {
            this.confirm();
            this.router.navigate(['/employer-profile/employer-home/menu/apllication-status/']);
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
