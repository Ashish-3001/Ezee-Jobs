import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetService } from 'src/app/servvices/get.service';
import { HttpClient } from '@angular/common/http';
import { MenuController, AlertController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  details: any = { };
  image1:any;
  image2:any;
  image3:any;

  constructor(
  private acitivatedRoute: ActivatedRoute, 
  private job_details: GetService, 
  private http: HttpClient, 
  public menuCtrl: MenuController,
  public alertController: AlertController,
  private callNumber: CallNumber) { }

  ngOnInit() {
    this.acitivatedRoute.paramMap.subscribe(paraMap => {
      if(!paraMap.has('eyee_id')) {
          console.log('error');
        return
      }
      const eyee_id = paraMap.get('eyee_id');
      var i:number =0;
      this.http.get(`http://tekhab.pythonanywhere.com/JobPost/${eyee_id}`).subscribe((data:any)=>{
        this.details = data;
        this.http.get(`http://tekhab.pythonanywhere.com/ImageEyerPic/?eyer_id=${data.eyer_id}`).subscribe((data: any) => {
          this.image1 = data[0].image;
          this.image2 = data[1].image;
          this.image3 = data[2].image;
        });
      });
    });
  }
  
  ionViewWillEnter() {
    this.menuCtrl.enable(true); 
  }

  async presentAlertCallNow(phoneNum) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Connect Call',
      message: 'This call may be recorded for <strong>Security</strong> purpose...Please Refrain from using foul language ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Processed',
          handler: () => {
            this.callNow(phoneNum);
          }
        }
      ]
    });

    await alert.present();
  }

  callNow(phoneNum) {
    this.callNumber.callNumber(phoneNum, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
}
