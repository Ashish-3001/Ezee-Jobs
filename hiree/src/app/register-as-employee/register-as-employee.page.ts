import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../servvices/post.service';
import { AlertController } from '@ionic/angular';




@Component({
  selector: 'app-register-as-employee',
  templateUrl: './register-as-employee.page.html',
  styleUrls: ['./register-as-employee.page.scss'],
})

export class RegisterAsEmployeePage implements OnInit {

  form: FormGroup;
  imageStringDp: string;
  imageStringIdF: string = undefined;
  imageStringIdB: string = undefined;
  imageStringE1: string;
  imageStringE2: string;
  imageStringE3: string;
  imageStringE4: string;
  imageStringE5: string; 
  postimage = new FormData(document.forms[0]);
  onIdImageToggel: boolean = false;
  onEImageToggel: boolean = false;

  constructor(public menuCtrl: MenuController, private postdata:PostService) { }

  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl(null, { validators: [Validators.required]}),
    })
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  onSubmit(form: NgForm) {
    var postdata = {
      user_id: this.postdata.user_id.value,
      eyee_phone:this.postdata.user_phone.value ,
      eyee_name: form.value.Name,
      eyee_aadhar_no: form.value.aadhar,
      eyee_age: form.value.age,
      eyee_gender: form.value.gender,
      eyee_address_1: form.value.address1,
      eyee_address_2: form.value.address2,
      eyee_city: form.value.city,
      eyee_state: form.value.state,
      eyee_type_hotel: form.value.type.toString(),
      eyee_education: form.value.education,
      eyee_choice: form.value.choice.toString(),
      eyee_time: form.value.time,
      eyee_pre_experience: form.value.previousExperience,
      eyee_place_pre_experience: form.value.placePreviousExprience,
      eyee_add_skills: form.value.additionalSkills,
      eyee_salary_expected: form.value.salary,
    }
    this.postdata.post_employee_details(postdata,
      this.imageStringDp,
      this.imageStringIdF,
      this.imageStringIdB,
      this.imageStringE1,
      this.imageStringE2,
      this.imageStringE3,
      this.imageStringE4,
      this.imageStringE5);
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

  onImagePickedE1(imageData:string) {
    if(typeof imageData === 'string') {
      this.imageStringE1 = imageData;
     }
     else {
       console.log("error in reciving the string");
     }
  }

  onImagePickedE2(imageData:string) {
    if(typeof imageData === 'string') {
      this.imageStringE2 = imageData;
     }
     else {
       console.log("error in reciving the string");
     }
  }

  onImagePickedE3(imageData:string) {
    if(typeof imageData === 'string') {
      this.imageStringE3 = imageData;
     }
     else {
       console.log("error in reciving the string");
     }
  }

  onImagePickedE4(imageData:string) {
    if(typeof imageData === 'string') {
      this.imageStringE4 = imageData;
     }
     else {
       console.log("error in reciving the string");
     }
  }

  onImagePickedE5(imageData:string) {
    if(typeof imageData === 'string') {
      this.imageStringE5 = imageData;
     }
     else {
       console.log("error in reciving the string");
    }
  }
  
  onIdImageClick() {
    this.onIdImageToggel = !this.onIdImageToggel;
  }
  onEImageClick() {
    this.onEImageToggel = !this.onEImageToggel;
  }
}

  