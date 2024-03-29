import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { GetService } from './get.service';
import { AuthenticationService } from './authentication.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OtpVerifyComponent } from 'src/app/shared/otp-verify/otp-verify.component';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';

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

@Injectable({
  providedIn: 'root'
})
export class PostService {
  user_id = new BehaviorSubject(0);
  user_phone = new BehaviorSubject(0);
  user_type = new BehaviorSubject<string>(undefined);

  data:any;
  form: FormGroup;
  imageFile: Blob; 
  

  constructor(private http: HttpClient, private log_details: GetService, private authService: AuthenticationService,public alertController: AlertController,private router: Router,private modalCtrl: ModalController,)  { }

  post_basic_details(postdata:any) {
    this.http.post('http://tekhab.pythonanywhere.com/UserLogin/', postdata).subscribe( (data) =>{
      this.data =data;
      this.user_id.next(this.data.id);
      this.user_phone.next(this.data.user_phone_no);
    }, (error) => {
      this.presentAlertConfirm();
    });
  }

  post_employer_details(postdata: any,
    imageString1: string, 
    imageString2: string,
    imageString3: string,
    user_id: any,
    user_phone: any) {
    postdata.user_id = user_id;
    postdata.eyer_phone = user_phone;
    this.http.post('http://tekhab.pythonanywhere.com/EmployerDetails/', postdata).subscribe( (data) =>{
      this.data =data;
      this.user_id.next(this.data.id);
      if(this.user_id.value && imageString1 && typeof imageString1 === 'string' ) {
        var file: Blob = this.onImagePicked(imageString1);
        var postimage = new FormData(document.forms[0]);
        postimage.append('eyer_id',this.user_id.value.toString());
        postimage.append('image',file, 'name:image.jpeg');
        this.http.post('http://tekhab.pythonanywhere.com/ImageEyerPic/' , postimage).subscribe( () =>{ });
      }
      if(this.user_id.value && imageString2 && typeof imageString2 === 'string' ) {
        console.log(imageString2);
        var file: Blob = this.onImagePicked(imageString2);
        var postimage = new FormData(document.forms[0]);
        postimage.append('eyer_id',this.user_id.value.toString());
        postimage.append('image',file, 'name:image.jpeg');
        console.log("hii");
        this.http.post('http://tekhab.pythonanywhere.com/ImageEyerPic/' , postimage).subscribe( () =>{ });
      }
      if(this.user_id.value && imageString3 && typeof imageString3 === 'string' ) {
        console.log(imageString3);
        var file: Blob = this.onImagePicked(imageString3);
        var postimage = new FormData(document.forms[0]);
        postimage.append('eyee_id',this.user_id.value.toString());
        postimage.append('image',file, 'name:image.jpeg');
        console.log("hii");
        this.http.post('http://tekhab.pythonanywhere.com/ImageEyerPic/' , postimage).subscribe( () =>{ });
      }
    }, (error) => {
      console.log(error);
      this.http.delete(`http://tekhab.pythonanywhere.com/UserLogin/${user_id}`).subscribe( () => { });
      this.presentAlertConfirm();
    });
  }

  post_employee_details(postdata: any,
    imageStringDp: string, 
    imageStringIdF: string, 
    imageStringIdB: string,
    imageStringE1: string,
    imageStringE2: string,
    imageStringE3: string,
    imageStringE4: string,
    imageStringE5: string,) {
    this.http.post('http://tekhab.pythonanywhere.com/EmployeeDetails/', postdata).subscribe( (data) =>{
      console.log("success");
      this.data =data;
      this.user_id.next(this.data.id);
      if(this.user_id.value && imageStringDp && typeof imageStringDp === 'string' ) {
        console.log(imageStringDp);
        var file: Blob = this.onImagePicked(imageStringDp);
        var postimage = new FormData(document.forms[0]);
        postimage.append('eyee_id',this.user_id.value.toString());
        postimage.append('image_dp',file, 'name:image.jpeg');
        console.log("hii");
        this.http.post('http://tekhab.pythonanywhere.com/ImageEyeeDp/' , postimage).subscribe( () =>{ });
      }
      if(this.user_id.value && imageStringIdF && typeof imageStringIdF === 'string' ) {
        console.log(imageStringIdF);
        var file: Blob = this.onImagePicked(imageStringIdF);
        var postimage = new FormData(document.forms[0]);
        postimage.append('eyee_id',this.user_id.value.toString());
        postimage.append('image',file, 'name:image.jpeg');
        console.log("hii");
        this.http.post('http://tekhab.pythonanywhere.com/ImageEyeeIdF/' , postimage).subscribe( () =>{ });
      }
      if(this.user_id.value && imageStringIdB && typeof imageStringIdB === 'string' ) {
        console.log(imageStringIdB);
        var file: Blob = this.onImagePicked(imageStringIdB);
        var postimage = new FormData(document.forms[0]);
        postimage.append('eyee_id',this.user_id.value.toString());
        postimage.append('image',file, 'name:image.jpeg');
        console.log("hii");
        this.http.post('http://tekhab.pythonanywhere.com/ImageEyeeIdB/' , postimage).subscribe( () =>{ });
      }
      if(this.user_id.value && imageStringE1 && typeof imageStringE1 === 'string' ) {
        console.log(imageStringE1);
        var file: Blob = this.onImagePicked(imageStringE1);
        var postimage = new FormData(document.forms[0]);
        postimage.append('eyee_id',this.user_id.value.toString());
        postimage.append('image',file, 'name:image.jpeg');
        console.log("hii");
        this.http.post('http://tekhab.pythonanywhere.com/ImageEyeeE/' , postimage).subscribe( () =>{ });
      }
      if(this.user_id.value && imageStringE2 && typeof imageStringE2 === 'string' ) {
        console.log(imageStringE2);
        var file: Blob = this.onImagePicked(imageStringE2);
        var postimage = new FormData(document.forms[0]);
        postimage.append('eyee_id',this.user_id.value.toString());
        postimage.append('image',file, 'name:image.jpeg');
        console.log("hii");
        this.http.post('http://tekhab.pythonanywhere.com/ImageEyeeE/' , postimage).subscribe( () =>{ });
      }
      if(this.user_id.value && imageStringE3 && typeof imageStringE3 === 'string' ) {
        console.log(imageStringE3);
        var file: Blob = this.onImagePicked(imageStringE3);
        var postimage = new FormData(document.forms[0]);
        postimage.append('eyee_id',this.user_id.value.toString());
        postimage.append('image',file, 'name:image.jpeg');
        console.log("hii");
        this.http.post('http://tekhab.pythonanywhere.com/ImageEyeeE/' , postimage).subscribe( () =>{ });
      }
      if(this.user_id.value && imageStringE4 && typeof imageStringE4 === 'string' ) {
        console.log(imageStringE4);
        var file: Blob = this.onImagePicked(imageStringE4);
        var postimage = new FormData(document.forms[0]);
        postimage.append('eyee_id',this.user_id.value.toString());
        postimage.append('image',file, 'name:image.jpeg');
        console.log("hii");
        this.http.post('http://tekhab.pythonanywhere.com/ImageEyeeE/' , postimage).subscribe( () =>{ });
      }
      if(this.user_id.value && imageStringE5 && typeof imageStringE5 === 'string' ) {
        console.log(imageStringE5);
        var file: Blob = this.onImagePicked(imageStringE5);
        var postimage = new FormData(document.forms[0]);
        postimage.append('eyee_id',this.user_id.value.toString());
        postimage.append('image',file, 'name:image.jpeg');
        console.log("hii");
        this.http.post('http://tekhab.pythonanywhere.com/ImageEyeeE/' , postimage).subscribe( () =>{ });
      }
    });
  }

  post_job_post(postdata: any, total_job_post: number, eyer_id: number, active_job_post: number) {
    this.http.post('http://tekhab.pythonanywhere.com/JobPost/', postdata).subscribe( () =>{
      total_job_post += 1;
      active_job_post += 1;
      this.test_put(total_job_post, eyer_id, active_job_post);
      this.log_details.refresh.next(1);
    });
  }

  test_put(total_job_post:number, eyer_id: number, active_job_post:number) {
    var data = {
      eyer_tot_no_job_post: total_job_post,
      eyer_active_job_post: active_job_post,
    }
    this.http.patch(`http://tekhab.pythonanywhere.com/EmployerDetails/${eyer_id}/`, data ).subscribe( (data) =>{
      console.log(data);
     });
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
          handler: () => {
            this.user_type.next('invalid');
            this.modalCtrl.dismiss({component: OtpVerifyComponent });
          }
        }
      ]
    });
    await alert.present();
  }
}
