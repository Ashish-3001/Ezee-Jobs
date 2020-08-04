import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  form: NgModel;

  constructor(private http: HttpClient, public alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Try Again',
      message: 'Something went wrong. Please Re Enter the give Details and<strong>Try Again</strong>!!!',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    });

    await alert.present();
  }

  async presentAlertThanks() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Thank You',
      message: 'We will get back to you <strong>Shortly</strong>!!!',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary'
        }
      ]
    });

    await alert.present();
  }

  help(form: NgForm) {
    var postdata = {
      user_name: form.value.name,
      user_email: form.value.email,
      user_number: form.value.phone,
      user_desc: form.value.des,
    }
    this.http.post('http://tekhab.pythonanywhere.com/Help/', postdata).subscribe( (data) => {
      this.presentAlertThanks();
    }, (error) => {
      this.presentAlertConfirm();
    });
    form.resetForm(); 
  }
  
}
