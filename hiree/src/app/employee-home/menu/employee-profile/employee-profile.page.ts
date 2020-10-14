import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/servvices/get.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/servvices/authentication.service';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.page.html',
  styleUrls: ['./employee-profile.page.scss'],
})
export class EmployeeProfilePage implements OnInit {
  job_post_toggle: boolean = false;
  details: any = {};
  image:any;

  constructor(private http:HttpClient,
    public menuCtrl: MenuController, 
    private get: GetService,
    private authService: AuthenticationService,
    public alertController: AlertController) { }

  ngOnInit() {
    this.authService.data.then((value) => {
      this.details = value;
      this.http.get(`http://tekhab.pythonanywhere.com/ImageEyeeDp/?eyee_id=${value.id}`).subscribe((data: any) => {
        this.image = data[0].image_dp;
      });
    });    
  }

  ToggleChange(res: boolean) {
    if(res == false) {
      this.presentAlertDontShowProfile(res);
    }
    else if(res == true) {
      this.presentAlertShowProfile(res)
    }
  }

  state() {
    this.job_post_toggle = !this.job_post_toggle;
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true); 
  }

  async presentAlertDontShowProfile(res) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert !!',
      message: "By doing this the employers will not be able to see your profile unless you <strong>apply for the job</strong>",
      buttons: [
        {
          text: 'Processed',
          handler: () => {
            var postdataE = {
              eyee_active: res,
            }
            this.http.patch(`http://tekhab.pythonanywhere.com/EmployeeDetails/${this.details.id}/`, postdataE).subscribe( (data) => {
              this.authService.token_set(this.details.id, 'employee');
              this.details = data;
            }, (error) => {
              this.presentAlertToggleMistake();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertShowProfile(res) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Great !!',
      message: "Now By doing this all employers will be able to see your profile",
      buttons: [
        {
          text: 'Processed',
          handler: () => {
            var postdataE = {
              eyee_active: res,
            }
            this.http.patch(`http://tekhab.pythonanywhere.com/EmployeeDetails/${this.details.id}/`, postdataE).subscribe( (data) => {
              this.authService.token_set(this.details.id, 'employee');
              this.details = data;
            }, (error) => {
              this.presentAlertToggleMistake();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertToggleMistake() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sorry !!',
      message: "Something went wronge <strong>Please Try Again later</strong>",
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
}
