import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/servvices/authentication.service';
import { MenuController, AlertController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {

  public selectedIndex = [];

  k:number =0;
  fav: object = [{ }];
  eyer_details:any;
  results: any = [{ }];


  constructor(
    private http: HttpClient,
    public menuCtrl: MenuController,
    private authService: AuthenticationService,
    public alertController: AlertController,
    private callNumber: CallNumber) 
  {

    
  }

  ngOnInit() {
    this.authService.data.then((value:any) => {
      this.eyer_details = value;
      this.http.get(`http://tekhab.pythonanywhere.com/EmployerDetailsFav/?eyer_id=${this.eyer_details.id}&unliked=false`).subscribe( (data:any) => {
        this.fav = data;
        var b:number =0;
        for(var i=0; i>=0;i++) {
          if(this.fav[i]) {
            if(this.fav[i].unliked == false) {
              this.selectedIndex.push(this.fav[i].eyee_id);
              this.http.get(`http://tekhab.pythonanywhere.com/EmployeeDetails/${this.fav[i].eyee_id}/`).subscribe( (data) => {
                this.results[b++] = data;
              });
            }
            this.k++;
          }
          else {
            break;
          }
        }
      });
    });
  }

  dislike(f, a) {
    for(var i=0; i<this.k;i++) {
      if(this.fav[i].eyee_id == f) {
        var pacthdata = {
          unliked: true,
        }
        this.http.patch(`http://tekhab.pythonanywhere.com/EmployerDetailsFav/${this.fav[i].id}/`, pacthdata).subscribe( () => { });
        const index = this.selectedIndex.indexOf(f);
        if (index > -1) {
          this.selectedIndex.splice(index, 1);
        }

        const index2 = this.results.indexOf(this.results[a]);
        if (index2 > -1) {
          this.results.splice(index2, 1);
        }
      }
    }
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
