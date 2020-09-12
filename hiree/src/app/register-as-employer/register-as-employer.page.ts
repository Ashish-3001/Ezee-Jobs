import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { PostService } from '../servvices/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-as-employer',
  templateUrl: './register-as-employer.page.html',
  styleUrls: ['./register-as-employer.page.scss'],
})
export class RegisterAsEmployerPage implements OnInit {

  imageString1: string;
  imageString2: string;
  imageString3: string;
  onImageToggel:boolean= false;

  constructor(public menuCtrl: MenuController, private postdata: PostService,public alertController: AlertController,private router: Router,) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  onSubmit(form: NgForm) {
    var postdata = {
      user_id: this.postdata.user_id.value,
      eyee_phone:this.postdata.user_phone.value,
      eyer_gst_no: form.value.gst,
      eyer_hotel_name: form.value.hotel_name,
      eyer_address_1: form.value.address_1,
      eyer_address_2: form.value.address_2,
      eyer_city: form.value.city,
      eyer_state: form.value.state,
      eyer_website: form.value.website,
      eyer_type: form.value.type,
      eyer_category: form.value.category,
      eyer_cuisines: form.value.cuisines.toString(),
      eyer_no_seats: form.value.seats,
    }

    this.postdata.post_employer_details(postdata,
      this.imageString1,
      this.imageString2,
      this.imageString3,
      "hey",
      "hey");

  }

  onImagePicked1(imageData:string) {
    if(typeof imageData === 'string') {
      this.imageString1 = imageData;
     }
     else {
       console.log("error in reciving the string");
     }
  }

  onImagePicked2(imageData:string) {
    if(typeof imageData === 'string') {
      this.imageString2 = imageData;
     }
     else {
       console.log("error in reciving the string");
     }
  }

  onImagePicked3(imageData:string) {
    if(typeof imageData === 'string') {
      this.imageString3 = imageData;
     }
     else {
       console.log("error in reciving the string");
     }
  }

  onImageClick() {
    this.onImageToggel = !this.onImageToggel;
  }

  async presentAlertConfirm(form: NgForm) {
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
          text: 'Submit',
          handler: () => {
            this.onSubmit(form);
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }
}
