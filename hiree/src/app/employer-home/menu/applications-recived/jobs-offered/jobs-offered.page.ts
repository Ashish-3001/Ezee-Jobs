import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MenuController, AlertController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-jobs-offered',
  templateUrl: './jobs-offered.page.html',
  styleUrls: ['./jobs-offered.page.scss'],
})
export class JobsOfferedPage implements OnInit {
  job_post_toggle: boolean = false;
  offered_jobs:any = [ ];
  n:number;
  image:any;

  constructor(private acitivatedRoute: ActivatedRoute, 
    private http: HttpClient,
    public menuCtrl: MenuController,
    public alertController: AlertController,
    private callNumber: CallNumber) { }

  ngOnInit() {
    this.acitivatedRoute.paramMap.subscribe(paraMap => {
      if(!paraMap.has('eyer_id')) {
        console.log('error');
        return
      }
      const job_id = paraMap.get('eyer_id');
      this.http.get(`http://tekhab.pythonanywhere.com/JobOffer/?job_id=${job_id}`).subscribe( (value:any) => {
        var k: number = 0;
        for(value.id in value) {
          var j:number =0;
          this.http.get(`http://tekhab.pythonanywhere.com/EmployeeDetails/${value[k++].eyee_id}/`).subscribe( (data) => {
            this.offered_jobs[j++] = data;
          });
        }        
      });
    });
  }

  state(i) {
    this.job_post_toggle = !this.job_post_toggle;
    this.n = i;
    this.http.get(`http://tekhab.pythonanywhere.com/ImageEyeeDp/?eyee_id=${this.offered_jobs[this.n].id}`).subscribe((data: any) => {
      this.image = data[0].image_dp;
    });
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
