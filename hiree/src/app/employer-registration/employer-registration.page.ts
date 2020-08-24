import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {

  }

  eyer_details() {
    
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

}
