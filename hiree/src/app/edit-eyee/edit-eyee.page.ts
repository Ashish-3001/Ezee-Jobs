import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/servvices/authentication.service';
import { AlertController, MenuController} from '@ionic/angular';
import { NgForm, FormGroup, FormControl, Validators  } from '@angular/forms';

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
  else
      byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  
  return new Blob([ia], {type:mimeString});
}

@Component({
  selector: 'app-edit-eyee',
  templateUrl: './edit-eyee.page.html',
  styleUrls: ['./edit-eyee.page.scss'],
})
export class EditEyeePage implements OnInit {

  job_post_toggle: boolean = false;
  details: any = {};
  image:any;
  editImage:boolean = false;
  imageId:number;
  emailId: any;
  emailIdNoCHange:any;
  category:any;
  imageToggle:boolean = false;
  emailToggle:boolean =false;
  professionToggle:boolean =false;
  personalDetailToggle:boolean = false;
  postdataE: any;
  Editchangd:boolean = false;
  imageFile: Blob;
  form: FormGroup;


  constructor(private http:HttpClient,
    public menuCtrl: MenuController,
    private authService: AuthenticationService,
    public alertController: AlertController) { }


  ngOnInit() {
    this.postdataE = {
      user_id: "",
      eyee_phone:"",
      eyee_name: "",
      eyee_aadhar_no: "",
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
    this.authService.data.then((value) => {
      this.details = value;
      this.postdataE.user_id = value.user_id;
      this.postdataE.eyee_phone = value.eyee_phone;
      this.postdataE.eyee_name = value.eyee_name;
      this.postdataE.eyee_aadhar_no = value.eyee_aadhar_no;
      this.http.get(`http://tekhab.pythonanywhere.com/ImageEyeeDp/?eyee_id=${value.id}`).subscribe((data: any) => {
        this.image = data[0].image_dp;
        this.imageId = data[0].id;
        console.log(this.imageId);
      });
      this.http.get(`http://tekhab.pythonanywhere.com/UserLogin/${value.user_id}`).subscribe((data:any) => {
        this.emailId = data.user_email;
        this.emailIdNoCHange = data.user_email;
        this.category = this.details.eyee_choice;
      });
    });
  }

  edit(form: NgForm) {
    this.postdataE.eyee_choice = this.details.eyee_choice;
    if(form.value.address1){
      this.postdataE.eyee_address_1 = form.value.address1;
      this.Editchangd = true;
    }
    else {
      this.postdataE.eyee_address_1 = this.details.eyee_address_1;
    }
    if(form.value.address2){
      this.postdataE.eyee_address_2 = form.value.address2;
      this.Editchangd = true;
    }
    else {
      this.postdataE.eyee_address_2 = this.details.eyee_address_2;
    }
    if(form.value.city){
      this.postdataE.eyee_city = form.value.city;
      this.Editchangd = true;
    }
    else {
      this.postdataE.eyee_city = this.details.eyee_city;
    }
    if(form.value.state){
      this.postdataE.eyee_state = form.value.state;
      this.Editchangd = true;
    }
    else {
      this.postdataE.eyee_state = this.details.eyee_state;
    }
    if(form.value.salary){
      this.postdataE.eyee_salary_expected = form.value.salary;
      this.Editchangd = true;
    }
    else {
      this.postdataE.eyee_salary_expected = this.details.eyee_salary_expected;
    }
    if(form.value.education){
      this.postdataE.eyee_education = form.value.education;
      this.Editchangd = true;
    }
    else {
      this.postdataE.eyee_education = this.details.eyee_education;
    }
    if(form.value.time){
      this.postdataE.eyee_time = form.value.time;
      this.Editchangd = true;
    }
    else {
      this.postdataE.eyee_time = this.details.eyee_time;
    }
    if(form.value.previousExperience){
      this.postdataE.eyee_pre_experience = form.value.previousExperience;
      this.Editchangd = true;
    }
    else {
      this.postdataE.eyee_pre_experience = this.details.eyee_pre_experience;
    }
    if(form.value.placePreviousExprience){
      this.postdataE.eyee_place_pre_experience = form.value.placePreviousExprience;
      this.Editchangd = true;
    }
    else {
      this.postdataE.eyee_place_pre_experience = this.details.eyee_place_pre_experience;
    }
    if(form.value.additionalSkills){
      this.postdataE.eyee_add_skills = form.value.additionalSkills;
      this.Editchangd = true;
    }
    else {
      this.postdataE.eyee_add_skills = this.details.eyee_add_skills;
    }
    if(this.Editchangd == true) {
      this.http.patch(`http://tekhab.pythonanywhere.com/EmployeeDetails/${this.details.id}/`, this.postdataE).subscribe( (data) => {
        this.authService.token_set(this.details.id, 'employee');
        setTimeout(()=>{ 
          this.personalDetailToggle = false;
          this.ngOnInit(); }, 2000)
      }, (error) => {
        this.personalDetailToggle = false;
        this.presentAlertEditMistake();
      });
    }
  }

  state(num: number) {
    if(num ==1) {
      this.imageToggle = !this.imageToggle;
      if(this.editImage == true) {
        this.editImage = false;
      }
    }
    if(num ==2) {
      this.emailToggle = !this.emailToggle;
    }
    if(num ==3) {
      this.professionToggle = !this.professionToggle;
    }
    if(num ==4) {
      this.personalDetailToggle = !this.personalDetailToggle;
    }
  }

  editEmail() {
    if(this.emailId === this.emailIdNoCHange) {
      return;
    }
    else {
      var patchEmail = {
        user_email: this.emailId,
      }
      this.http.patch(`http://tekhab.pythonanywhere.com/UserLogin/${this.details.user_id}/`, patchEmail).subscribe( () => { 
        this.emailToggle = false;
        this.emailIdNoCHange = this.emailId;
      }, (error) => {
        this.emailToggle = false;
        this.presentAlertEditMistake();
      });
    }
  }

  Category(profession:string) {
    if(profession === this.category) {
      return;
    }
    else {
      var pacthChoice = {
        eyee_choice: profession.toString(),
      }
      this.http.patch(`http://tekhab.pythonanywhere.com/EmployeeDetails/${this.details.id}/`, pacthChoice).subscribe( () => {
        this.authService.token_set(this.details.id, 'employee');
        this.professionToggle = false;
        this.category = profession;
      }, (error) => {
        this.professionToggle = false;
        this.presentAlertEditMistake();
      });
    }
  }

  onImagePickedDp(imageData:string) {
    if(typeof imageData === 'string') {
        var file: Blob = this.onImagePicked(imageData);
        var postimage = new FormData(document.forms[0]);
        postimage.append('image_dp',file, 'name:image.jpeg');
        console.log("hii");
        this.http.patch(`http://tekhab.pythonanywhere.com/ImageEyeeE/${this.imageId}`, postimage).subscribe( () =>{ 
          this.ngOnInit();
        }, (error) => {
          this.presentAlertEditMistake();
        });
     }
     else {
       console.log("error in reciving the string");
     }
  }

  async presentAlertEditMistake() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sorry !!',
      message: "Something went wronge <strong>Please Try Again</strong>",
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

  onImagePicked(imageData:string) {
    if(typeof imageData === 'string' ) {
      try {
        this.imageFile = dataURItoBlob(imageData);
        
        this.form = new FormGroup({
          image: new FormControl(null, { validators: [Validators.required]}),
        });
        return this.imageFile;
      } catch(error) {
        console.log(error);
        return;
      }
     }
     else {
       console.log("error in reciving the string");
     }
  }
}
