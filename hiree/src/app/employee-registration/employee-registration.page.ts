import { Component, OnInit } from '@angular/core';

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
  onIdImageToggel: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  eyee_details() {

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
}
