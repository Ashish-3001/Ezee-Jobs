import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/servvices/authentication.service';
import { AlertController, MenuController } from '@ionic/angular';

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
  private router: Router) { }

  ngOnInit() {
    this.acitivatedRoute.paramMap.subscribe(paraMap => {
      if(!paraMap.has('eyer_id')) {
        console.log('error');
        return
      }
      const job_id = paraMap.get('eyer_id');
      this.http.get(`http://tekhab.pythonanywhere.com/ShortListed/?job_id=${job_id}&confirmed=false&job_active=true`).subscribe( (value:any) => {
        this.value = value;
        console.log(value);
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
    this.http.patch(`http://tekhab.pythonanywhere.com/ShortListed/${this.value[this.n].id}/`, data ).subscribe( (data) =>{
      console.log(data);
    });
    var deletedata = {
      job_active: false,
    }
    this.http.patch(`http://tekhab.pythonanywhere.com/JobPost/${this.value[this.n].job_id}/`, deletedata ).subscribe( (data) =>{
      console.log(data);
    });
    var pactheyee = {
      eyee_no_shortlisted: ++this.eyee_no_shortlisted,
    }
    this.http.patch(`http://tekhab.pythonanywhere.com/EmployeeDetails/${this.value[this.n].eyee_id}/`, pactheyee).subscribe( (data) => {
      console.log(data);
    });
    this.authService.data.then( (value) => {
      var pactheyer = {
        eyer_job_hier: ++value.eyer_job_hier,
      }
      this.http.patch(`http://tekhab.pythonanywhere.com/EmployerDetails/${this.value[this.n].eyee_id}/`, pactheyer).subscribe( (data) => {
        console.log(data);
      });
    });
  }

  reject() {
    var data = {
      job_active: false,
    }
    this.http.patch(`http://tekhab.pythonanywhere.com/ShortListed/${this.value[this.n].id}/`, data ).subscribe( (data) =>{
      console.log(data);
    });
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
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'confirm',
          handler: () => {
            console.log('Confirm Okay');
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
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Reject',
          handler: () => {
            console.log('Confirm Okay');
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
