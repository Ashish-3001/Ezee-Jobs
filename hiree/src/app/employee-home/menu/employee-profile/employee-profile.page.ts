import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/servvices/get.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/servvices/authentication.service';
import { AlertController } from '@ionic/angular';

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

  state() {
    this.job_post_toggle = !this.job_post_toggle;
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}