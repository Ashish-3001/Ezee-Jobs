import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/servvices/authentication.service';
import { GetService } from 'src/app/servvices/get.service';
import { HttpClient } from '@angular/common/http';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.page.html',
  styleUrls: ['./job-offer.page.scss'],
})
export class JobOfferPage implements OnInit {

  constructor(
    private acitivatedRoute: ActivatedRoute, 
    private authService: AuthenticationService,
    public menuCtrl: MenuController,
    public get: GetService,
    private http:HttpClient,
    private router:Router,
    public alertController: AlertController) { 
      
    }

  ngOnInit() {
    
  }

  offer_job() {
    this.acitivatedRoute.paramMap.subscribe(paraMap => {
      var postdata = {
        eyee_id: "",
        eyee_name: "",
        job_id: 0,
        job_post: "",
        eyer_id: 0,
        eyer_name: "",
        offer_letter: "Congratulations, You can be a part of THIS Hotel with the summoned designation.We are impressed with your profile and looking forward to meet you..You are required to ensure that your douments get Checked before the first day of work. Regards ",
      }
      var eyee_no_offered:any;
      var eyer_job_offer:any;
      var job_no_emplyee_offered:any;
      postdata.eyee_id = paraMap.get('eyer_id');
      this.http.get(`http://tekhab.pythonanywhere.com/EmployeeDetails/${postdata.eyee_id}/`).subscribe( (data:any) => {
        postdata.eyee_name = data.eyee_name;
        eyee_no_offered = data.eyee_no_offered;
        this.authService.data.then((value) => {
          eyer_job_offer = value.eyer_job_offer;
          postdata.eyer_id = value.id;
          postdata.eyer_name = value.eyer_hotel_name;
          if(this.get.job_post_state.value == 0) {
            this.http.get(`http://tekhab.pythonanywhere.com/JobPost/?eyer_id=${value.id}&job_active=true`).subscribe((data)=>{
              job_no_emplyee_offered = data[0].job_no_emplyee_offered;
              postdata.job_id = data[0].id;
              postdata.job_post = data[0].job_post;
              this.http.post('http://tekhab.pythonanywhere.com/JobOffer/', postdata).subscribe( (data) => {
                console.log(data);
              });
              var pacthjob = {
                job_no_emplyee_offered: ++job_no_emplyee_offered,
              }
              this.http.patch(`http://tekhab.pythonanywhere.com/JobPost/${postdata.job_id}/`, pacthjob).subscribe( (data) => {
                console.log(data);
              });
            });
          }
          else if(this.get.job_post_state.value == 1) {
            this.http.get(`http://tekhab.pythonanywhere.com/JobPost/?eyer_id=${value.id}&job_active=true`).subscribe((data)=>{
              job_no_emplyee_offered = data[1].job_no_emplyee_offered;
              postdata.job_id = data[1].id;
              postdata.job_post = data[1].job_post;
              this.http.post('http://tekhab.pythonanywhere.com/JobOffer/', postdata).subscribe( (data) => {
                console.log(data);
              });
              var pacthjob = {
                job_no_emplyee_offered: ++job_no_emplyee_offered,
              }
              this.http.patch(`http://tekhab.pythonanywhere.com/JobPost/${postdata.job_id}/`, pacthjob).subscribe( (data) => {
                console.log(data);
              });
            });
          }
          else if(this.get.job_post_state.value == 2) {
            this.http.get(`http://tekhab.pythonanywhere.com/JobPost/?eyer_id=${value.id}&job_active=true`).subscribe((data)=>{
              job_no_emplyee_offered = data[2].job_no_emplyee_offered;
              postdata.job_id = data[2].id;
              postdata.job_post = data[2].job_post;
              this.http.post('http://tekhab.pythonanywhere.com/JobOffer/', postdata).subscribe( (data) => {
                console.log(data);
              });
              var pacthjob = {
                job_no_emplyee_offered: ++job_no_emplyee_offered,
              }
              this.http.patch(`http://tekhab.pythonanywhere.com/JobPost/${postdata.job_id}/`, pacthjob).subscribe( (data) => {
                console.log(data);
              });
            });
          }
          var pactheyee = {
            eyee_no_offered: ++eyee_no_offered,
          }
          this.http.patch(`http://tekhab.pythonanywhere.com/EmployeeDetails/${postdata.eyee_id}/`, pactheyee).subscribe( (data) => {
            console.log(data);
          });
          var pactheyer = {
            eyer_job_offer: ++eyer_job_offer,
          }
          this.http.patch(`http://tekhab.pythonanywhere.com/EmployerDetails/${value.id}/`, pactheyer).subscribe( (data) => {
            console.log(data);
          });
        });
      });
    });
    setTimeout(()=>{ this.router.navigate(['../employer-profile/employer-home']); }, 2000)
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ofeer Job',
      message: 'Are you <strong>Sure</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Offer',
          handler: () => {
            console.log('Confirm Okay');
            this.offer_job();
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
