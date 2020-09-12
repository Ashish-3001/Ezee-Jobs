import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../servvices/authentication.service';
import { GetService } from '../servvices/get.service';
import { ModalController, AlertController } from '@ionic/angular';
import { OtpVerifyComponent } from 'src/app/shared/otp-verify/otp-verify.component';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../servvices/post.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.page.html',
  styleUrls: ['./employee-registration.page.scss'],
})
export class EmployeeRegistrationPage implements OnInit {

  state:number = 1;
  imageStringDp: string;
  imageStringIdF: string = undefined;
  imageStringIdB: string = undefined;
  imageStringE1: string;
  imageStringE2: string;
  imageStringE3: string;
  imageStringE4: string;
  imageStringE5: string;
  onIdImageToggel: boolean = false;
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
      user_type: "employee",
      user_otp: 23456,
    }

    this.postdataE = {
      user_id: this.postdata.user_id.value,
      eyee_phone:this.postdata.user_phone.value ,
      eyee_name: "",
      eyee_aadhar_no: "",
      eyee_age: "",
      eyee_gender: "",
      eyee_address_1: "",
      eyee_address_2: "",
      eyee_city: "",
      eyee_state: "",
      eyee_type_hotel: "NotRequrired",
      eyee_education: "",
      eyee_choice: "",
      eyee_time: "",
      eyee_pre_experience: "",
      eyee_place_pre_experience: "",
      eyee_add_skills: "",
      eyee_salary_expected: "",
    }
  }

  eyee_details(form: NgForm) {
    this.postdataE.eyee_choice = this.Category_input.toString();
    this.postdataE.eyee_education = form.value.education;
    this.postdataE.eyee_time = form.value.time;
    this.postdataE.eyee_pre_experience = form.value.previousExperience;
    this.postdataE.eyee_place_pre_experience = form.value.placePreviousExprience;
    this.postdataE.eyee_add_skills = form.value.additionalSkills;
    this.postdataE.eyee_salary_expected = form.value.salary;

    this.postdata.post_employee_details(this.postdataE,this.imageStringDp,this.imageStringIdF,this.imageStringIdB,this.imageStringE1,this.imageStringE2,this.imageStringE3,this.imageStringE4,this.imageStringE5 );
    this.authService.login("employee", this.data.id);
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

  eyee_details1(form: NgForm) {
    this.postdataB.user_email = form.value.email;
    this.postdataE.eyee_aadhar_no  = form.value.aadhar;
    this.postdataE.eyee_name = form.value.Name;
    this.postdataE.eyee_age = form.value.age;
    this.postdataE.eyee_gender =form.value.gender;
    this.postdataE.eyee_address_1 = form.value.address1;
    this.postdataE.eyee_address_2 = form.value.address2;
    this.postdataE.eyee_city = form.value.city;
    this.postdataE.eyee_state = form.value.state;

    this.http.post('http://tekhab.pythonanywhere.com/UserLogin/', this.postdataB).subscribe( (data) =>{
      this.data =data;
      this.postdata.user_id.next(this.data.id);
      this.postdata.user_phone.next(this.data.user_phone_no);
      this.postdataE.user_id = this.data.id;
      this.postdataE.eyee_phone =this.data.user_phone_no;
      this.state = 2;
    }, (error) => {
      console.log(error);
      form.resetForm();
      this.presentAlertConfirm();
    });
  }

  Category(input:string) {
    this.Category_input = input;
    this.state = 3;
  }

  onImagePickedDp(imageData:string) {
    if(typeof imageData === 'string') {
      this.imageStringDp = imageData;
     }
     else {
       console.log("error in reciving the string");
     }
  }

  onImagePickedIdF(imageData:string) {
    if(typeof imageData === 'string') {
      this.imageStringIdF = imageData;
     }
     else {
       console.log("error in reciving the string");
     }
  }

  onImagePickedIdB(imageData:string) {
    if(typeof imageData === 'string') {
      this.imageStringIdB = imageData;
     }
     else {
       console.log("error in reciving the string");
     }
  }

  onIdImageClick() {
    this.onIdImageToggel = !this.onIdImageToggel;
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
