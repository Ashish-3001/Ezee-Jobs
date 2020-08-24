import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetService } from 'src/app/servvices/get.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/servvices/authentication.service';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  details: any = { };
  eyer_id: any;
  image1:any;
  image2:any;
  image3:any;


  constructor(private acitivatedRoute: ActivatedRoute, 
    private job_details: GetService, 
    private http: HttpClient,
    public menuCtrl: MenuController, 
    private authService: AuthenticationService,
    public alertController: AlertController,
    private router: Router) { }

  ngOnInit() {
    this.acitivatedRoute.paramMap.subscribe(paraMap => {
      if(!paraMap.has('eyer_id')) {
        console.log('error');
        return
      }
      const job_id = paraMap.get('eyer_id');
      var i:number =0;
      this.authService.data.then((value) => {
        this.http.get(`http://tekhab.pythonanywhere.com/JobPost/?eyer_id=${value.id}`).subscribe((data)=>{
         for(i; i >= 0; i++){
          if(data[i].id == job_id){
            this.details = data[i];
            this.eyer_id = data[i].id;
            this.http.get(`http://tekhab.pythonanywhere.com/ImageEyerPic/?eyer_id=${this.eyer_id}`).subscribe((data: any) => {
              this.image1 = data[0].image;
              this.image2 = data[1].image;
              this.image3 = data[2].image;
            });
            break;
          }
        };
        });
      });
    });
  }
  
  deactivate() {
    var data = {
      job_active: false,
    }
    this.http.patch(`http://tekhab.pythonanywhere.com/JobPost/${this.eyer_id}/`, data ).subscribe( () =>{ });
    this.authService.data.then((value) => {
      var pactheyer = {
        eyer_active_job_post: --value.eyer_active_job_post,
      }
      this.http.patch(`http://tekhab.pythonanywhere.com/EmployerDetails/${value.id}/`, pactheyer).subscribe( () => { 
        this.authService.token_set(value.id, 'employer');
       });
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'DELETE!',
      message: 'Are you <strong>Sure</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'DELETE',
          handler: () => {
            this.deactivate();
            this.router.navigate(['/employer-profile/employer-home//menu/apllication-status']);
          }
        }
      ]
    });

    await alert.present();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
}

