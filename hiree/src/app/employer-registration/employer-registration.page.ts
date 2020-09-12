import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../servvices/post.service';
import { HttpClient } from '@angular/common/http';
import { OtpVerifyComponent } from 'src/app/shared/otp-verify/otp-verify.component';
import { AlertController, ModalController } from '@ionic/angular';
import { GetService } from '../servvices/get.service';
import { AuthenticationService } from '../servvices/authentication.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-employer-registration',
  templateUrl: './employer-registration.page.html',
  styleUrls: ['./employer-registration.page.scss'],
})
export class EmployerRegistrationPage implements OnInit {

  state:number = 1;
  imageString1: string;
  imageString2: string;
  imageString3: string;
  onImageToggel:boolean= false;
  Choise = [];
  Category_input:string = undefined;
  data:any;
  postdataB: any;
  postdataE: any;

  constructor(
    private postdata: PostService,
    private http: HttpClient,
    public alertController: AlertController,
    private modalCtrl: ModalController,
    private Get: GetService,
    private authService: AuthenticationService,
    private menu: AppComponent) { }

  ngOnInit() {
    this.postdataB = {
      user_phone_no: this.postdata.user_phone.value,
      user_email: "",
      user_password: "notRequired",
      user_type: "employer",
      user_otp: 23456,
    }
    this.postdataE = {
      user_id: this.postdata.user_id.value,
      eyee_phone:this.postdata.user_phone.value,
      eyer_gst_no: "",
      eyer_hotel_name: "",
      eyer_address_1: "",
      eyer_address_2: "",
      eyer_city: "",
      eyer_state: "",
      eyer_website: "",
      eyer_type: "notRequired",
      eyer_category: "",
      eyer_cuisines: "notRequired",
      eyer_no_seats: 0,
    }
  }

  eyer_details(form: NgForm) {
    this.postdataE.eyer_category = this.Category_input.toString();
    this.postdataE.eyer_no_seats = form.value.seats;
    if(this.Category_input == "Restaurants") {
      this.postdataE.eyer_type = form.value.type;
      this.postdataE.eyer_cuisines = form.value.cuisines.toString();
    }
    if(this.Category_input == "Hotels") {
      this.postdataE.eyer_type =  form.value.category;
    }
    this.postdata.post_employer_details(this.postdataE,this.imageString1,this.imageString2,this.imageString3,this.data.id,this.data.user_phone_no);
    this.authService.login("employer", this.data.id);
      this.Get.logged_user_id.next(this.data.id);
      var postdata = {
        "phone":this.data.user_phone_no
      }
      this.http.post('http://tekhab.pythonanywhere.com/validate-otp/',postdata).subscribe( (data:any)=> {
        var otp =data.otp.toString();
        this.Get.otp_verification.next(otp);
        console.log(otp);
        this.Get.eyer_time.next(data.time)
      })
      this.modalCtrl.create({component: OtpVerifyComponent }).then(modalEl => {
        modalEl.present();
    });
  }

  eyer_details1(form: NgForm) {
    this.postdataB.user_email = form.value.email;
    this.postdataE.eyer_gst_no  = form.value.gst;
    this.postdataE.eyer_hotel_name = form.value.Name;
    this.postdataE.eyer_address_1 = form.value.address1;
    this.postdataE.eyer_address_2 = form.value.address2;
    this.postdataE.eyer_city = form.value.city;
    this.postdataE.eyer_state = form.value.state;
    this.postdataE.eyer_website = form.value.website;

    this.http.post('http://tekhab.pythonanywhere.com/UserLogin/', this.postdataB).subscribe( (data) =>{
      this.data =data;
      this.postdata.user_id.next(this.data.id);
      this.postdata.user_phone.next(this.data.user_phone_no);
      this.state = 2;
    }, (error) => {
      form.resetForm();
      this.presentAlertConfirm();
    });
  }

  Category(input:string) {
    this.Category_input = input;
    this.state = 3;
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

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Invaild Input',
      message: 'Please try<strong>Again</strong>!!!',
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

  ionViewWillLeave() {
    this.menu.ngOnInit();
  }
}
