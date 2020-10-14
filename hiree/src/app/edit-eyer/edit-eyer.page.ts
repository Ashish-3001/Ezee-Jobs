import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuController, AlertController } from '@ionic/angular';
import { GetService } from 'src/app/servvices/get.service';
import { PostService } from 'src/app/servvices/post.service';
import { AuthenticationService } from 'src/app/servvices/authentication.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

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
  selector: 'app-edit-eyer',
  templateUrl: './edit-eyer.page.html',
  styleUrls: ['./edit-eyer.page.scss'],
})
export class EditEyerPage implements OnInit {

  job_post_toggle: boolean = false;
  details: any = {};
  image1:any;
  image2:any;
  image3:any;
  editImage1:boolean = false;
  editImage2:boolean = false;
  editImage3:boolean = false;
  imageId1:number;
  imageId2:number;
  imageId3:number;
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


    this.authService.data.then((value) => {
      this.details = value;
      this.postdataE.user_id = value.user_id;
      this.postdataE.eyer_phone = value.eyer_phone;
      this.postdataE.eyer_gst_no = value.eyer_gst_no;
      this.postdataE.eyer_hotel_name = value.eyer_hotel_name;
      this.postdataE.eyer_category = value.eyer_category;
      this.http.get(`http://tekhab.pythonanywhere.com/ImageEyerPic/?eyer_id=${value.id}`).subscribe((data: any) => {
        this.image1 = data[0].image;
        this.imageId1 = data[0].id;
        this.image2 = data[1].image;
        this.imageId2 = data[1].id;
        this.image3 = data[2].image;
        this.imageId3 = data[2].id;
      });
      this.http.get(`http://tekhab.pythonanywhere.com/UserLogin/${value.user_id}`).subscribe((data:any) => {
        this.emailId = data.user_email;
        this.emailIdNoCHange = data.user_email;
        this.category = this.details.eyer_category;
      });
    });
  }
  
  edit(form: NgForm) {
    if(form.value.address1){
      this.postdataE.eyer_address_1 = form.value.address1;
      this.Editchangd = true;
    }
    else {
      this.postdataE.eyer_address_1 = this.details.eyer_address_1;
    }
    if(form.value.address2){
      this.postdataE.eyer_address_2 = form.value.address2;
      this.Editchangd = true;
    }
    else {
      this.postdataE.eyer_address_2 = this.details.eyer_address_2;
    }
    if(form.value.city){
      this.postdataE.eyer_city = form.value.city;
      this.Editchangd = true;
    }
    else {
      this.postdataE.eyer_city = this.details.eyer_city;
    }
    if(form.value.state){
      this.postdataE.eyer_state = form.value.state;
      this.Editchangd = true;
    }
    else {
      this.postdataE.eyer_state = this.details.eyer_state;
    }
    if(form.value.website){
      this.postdataE.eyer_website = form.value.website;
      this.Editchangd = true;
    }
    else {
      this.postdataE.eyer_website = this.details.eyer_website;
    }
    if(this.category=="Restaurants") {
      if(form.value.type){
        this.postdataE.eyer_type = form.value.type;
        this.Editchangd = true;
      }
      else {
        this.postdataE.eyer_type = this.details.eyer_type;
      }
      if(form.value.cuisines){
        this.postdataE.eyer_cuisines = form.value.cuisines;
        this.Editchangd = true;
      }
      else {
        this.postdataE.eyer_cuisines = this.details.eyer_cuisines;
      } 
    }
    if(this.category=="Hotels") {
      if(form.value.type){
        this.postdataE.eyer_type = form.value.type;
        this.Editchangd = true;
      }
      else {
        this.postdataE.eyer_type = this.details.eyer_type;
      }
    }
    if(form.value.seats){
      this.postdataE.eyer_no_seats = form.value.seats;
      this.Editchangd = true;
    }
    else {
      this.postdataE.eyer_no_seats = this.details.eyer_no_seats;
    }
    if(this.Editchangd == true) {
      this.http.patch(`http://tekhab.pythonanywhere.com/EmployerDetails/${this.details.id}/`, this.postdataE).subscribe( () => {
        this.authService.token_set(this.details.id, 'employer');
        setTimeout(()=>{ 
          this.personalDetailToggle = false;
          this.ngOnInit();
          console.log("hey");
          }, 2000);
      }, (error) => {
        console.log(error);
        this.personalDetailToggle = false;
        this.presentAlertEditMistake();
      });
    }
  }


  state(num: number) {
    if(num ==1) {
      this.imageToggle = !this.imageToggle;
      this.editImage1 = false;
      this.editImage2 = false;
      this.editImage3 = false;
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


  onImagePicked1(imageData:string) {
    if(typeof imageData === 'string') {
        var file: Blob = this.onImagePicked(imageData);
        var postimage = new FormData(document.forms[0]);
        postimage.append('image_dp',file, 'name:image.jpeg');
        console.log("hii");
        this.http.patch(`http://tekhab.pythonanywhere.com/ImageEyeeE/${this.imageId1}`, postimage).subscribe( () =>{ 
          this.ngOnInit();
        }, (error) => {
          this.presentAlertEditMistake();
        });
      }
     else {
       console.log("error in reciving the string");
     }
  }

  onImagePicked2(imageData:string) {
    if(typeof imageData === 'string') {
        var file: Blob = this.onImagePicked(imageData);
        var postimage = new FormData(document.forms[0]);
        postimage.append('image_dp',file, 'name:image.jpeg');
        console.log("hii");
        this.http.patch(`http://tekhab.pythonanywhere.com/ImageEyeeE/${this.imageId2}`, postimage).subscribe( () =>{ 
          this.ngOnInit();
        }, (error) => {
          this.presentAlertEditMistake();
        });
      }
     else {
       console.log("error in reciving the string");
     }
  }

  onImagePicked3(imageData:string) {
    if(typeof imageData === 'string') {
        var file: Blob = this.onImagePicked(imageData);
        var postimage = new FormData(document.forms[0]);
        postimage.append('image_dp',file, 'name:image.jpeg');
        console.log("hii");
        this.http.patch(`http://tekhab.pythonanywhere.com/ImageEyeeE/${this.imageId3}`, postimage).subscribe( () =>{ 
          this.ngOnInit();
        }, (error) => {
          this.presentAlertEditMistake();
        });
      }
     else {
       console.log("error in reciving the string");
     }
  }

  Category(profession:string) {
    if(profession === this.category) {
      return;
    }
    else {
      var pacthChoice = {
        eyer_category: profession,
      }
      this.http.patch(`http://tekhab.pythonanywhere.com/EmployerDetails/${this.details.id}/`, pacthChoice).subscribe( () => {
        this.authService.token_set(this.details.id, 'employer');
        this.professionToggle = false;
        this.category = profession;
      }, (error) => {
        this.professionToggle = false;
        this.presentAlertEditMistake();
      });
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
