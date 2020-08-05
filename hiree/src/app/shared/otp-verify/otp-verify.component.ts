import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GetService } from 'src/app/servvices/get.service';
import { AuthenticationService } from 'src/app/servvices/authentication.service';
import { AppComponent } from 'src/app/app.component';
import { ModalController, AlertController } from '@ionic/angular';
import { PostService } from 'src/app/servvices/post.service';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.scss'],
})
export class OtpVerifyComponent implements OnInit {
   
  otp:string;


  constructor(private http:HttpClient,
    private router:Router,
    private get: GetService,
    private menu: AppComponent,
    private modalCtrl: ModalController,
    private post: PostService,
    public alertController: AlertController) { }

  ngOnInit() {
    this.menu.ngOnInit();
    console.log(this.menu.state);
  }

  verify(form: NgForm) {
    this.otp = form.value.otp;
    if(this.get.otp_verification.value !== "0000") {
      if(this.get.otp_verification.value === this.otp) {
        if(this.menu.state === 'employee') {
          this.modalCtrl.dismiss();
          this.router.navigate(['employee-home']);
        }
        else if (this.menu.state === 'employer') {
          this.modalCtrl.dismiss();
          if(this.get.eyer_time.value === "exists"){
            this.router.navigate(['employer-profile/employer-home']);
          }
          else {
            this.router.navigate(['employer-profile']);
          }
        }
        else {
          if(this.post.user_type.value == 'employer') {
            this.modalCtrl.dismiss();
            this.router.navigate(['/register-as-employer']);
          }
          else if(this.post.user_type.value == 'employee') {
            this.modalCtrl.dismiss();
            this.router.navigate(['/register-as-employee']);
          }
          else {
            console.log("error state");
          }
        }
      }
      else {
        console.log("invalid otp ");
      }
    }
    else {
      console.log("error '0000' ");
    }
  }

  
  async presentAlertResendOTP() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Comfirm',
      message: 'Please confirm Your <strong>Phone Number</strong> Again!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Okay',
          handler: () => {
            this.modalCtrl.dismiss();
          }
        }
      ]
    });
    
    await alert.present();
  }


}
