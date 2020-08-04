import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/servvices/authentication.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-application-status',
  templateUrl: './application-status.page.html',
  styleUrls: ['./application-status.page.scss'],
})

export class ApplicationStatusPage implements OnInit {
  public page_state: string ='Offers Recived';
  job_post_toggle: boolean = false;
  eyee_id: number;
  jobs_offered: any = [{  }];
  applied_jobs: any = [{  }];
  shortlisted: any = [{  }];
  value1: object = [{  }];
  value2: object = [{  }];
  value3: object = [{  }];
  eyee_no_accept:any;
  n:number;
  eyer_id:number;
  image1:any;
  image2:any;
  image3:any;

  constructor(private http: HttpClient, 
  private authservice:AuthenticationService,
  public alertController: AlertController) { }

  ngOnInit() {
    this.authservice.data.then( (value) => {
      this.eyee_id = value.id;
      this.eyee_no_accept = value.eyee_no_accept;
      this.http.get(`http://tekhab.pythonanywhere.com/JobOffer/?job_id=&eyee_id=${this.eyee_id}&job_active=true&short_listed=false`).subscribe( (value:any) =>{
        this.value1 = value;
        console.log(value);
        var k: number = 0;
        for(value.id in value) {
          var j:number =0;
          this.http.get(`http://tekhab.pythonanywhere.com/JobPost/${value[k++].job_id}/`).subscribe( (data:any) => {
            this.jobs_offered[j++] = data;
          });
        }
      });
      this.http.get(`http://tekhab.pythonanywhere.com/JobApplied/?job_id=&eyee_id=${this.eyee_id}&job_active=true&short_listed=false`).subscribe( (value:any) =>{
        this.value2 = value;
        console.log(value);
        var k: number = 0;
        for(value.id in value) {
          var j:number =0;
          this.http.get(`http://tekhab.pythonanywhere.com/JobPost/${value[k++].job_id}/`).subscribe( (data:any) => {
            this.applied_jobs[j++] = data;
          });
        }
      });
      this.http.get(`http://tekhab.pythonanywhere.com/ShortListed/?job_id=&eyee_id=${this.eyee_id}&confirmed=false&job_active=true`).subscribe( (value:any) =>{
        this.value3 = value;
        console.log(value);
        var k: number = 0;
        for(value.id in value) {
          var j:number =0;
          this.http.get(`http://tekhab.pythonanywhere.com/JobPost/${value[k++].job_id}/`).subscribe( (data:any) => {
            this.shortlisted[j++] = data;
          });
        }
      });
    });
  }
  state(page:string) {
    if(page == "Offers Recived") {
      this.page_state = "Offers Recived";
    }
    else if(page == "Shortlisted") {
      this.page_state = "Shortlisted";
    }
    else if(page == "Applied Jobs") {
      this.page_state = "Applied Jobs";
    }
    if(this.job_post_toggle == true) {
      this.job_post_toggle = !this.job_post_toggle;
    }
  }
  state1(i,type:string) {
    this.job_post_toggle = !this.job_post_toggle;
    this.n = i;
    if(type=='jobs_offered'){
      this.eyer_id = this.jobs_offered[this.n].eyer_id;
      this.http.get(`http://tekhab.pythonanywhere.com/ImageEyerPic/?eyer_id=${this.eyer_id}`).subscribe((data: any) => {
        console.log(data);
        this.image1 = data[0].image;
        this.image2 = data[1].image;
        this.image1 = data[2].image;
      });
    }
    else if(type=='applied_jobs') {
      this.eyer_id = this.applied_jobs[this.n].eyer_id;
      this.http.get(`http://tekhab.pythonanywhere.com/ImageEyerPic/?eyer_id=${this.eyer_id}`).subscribe((data: any) => {
        console.log(data);
        this.image1 = data[0].image;
        this.image2 = data[1].image;
        this.image1 = data[2].image;
      });
    }
    else if(type=='shortlisted') {
      this.eyer_id = this.shortlisted[this.n].eyer_id;
      this.http.get(`http://tekhab.pythonanywhere.com/ImageEyerPic/?eyer_id=${this.eyer_id}`).subscribe((data: any) => {
        console.log(data);
        this.image1 = data[0].image;
        this.image2 = data[1].image;
        this.image1 = data[2].image;
      });
    }
  }

  accept() {
    var data = {
      job_active: false,
      short_listed: true,
    }
    var postdata ={
      job_id: this.value1[this.n].job_id,
      eyee_id: this.value1[this.n].eyee_id,
      short_list_type: "offered",
      short_list_type_id: this.value1[this.n].id,
    }
    var pacth = {
      eyee_no_accept: ++this.eyee_no_accept,
    }
    this.http.patch(`http://tekhab.pythonanywhere.com/JobOffer/${this.value1[this.n].id}/`, data ).subscribe( (data) =>{
      console.log(data);
    });
    this.http.post('http://tekhab.pythonanywhere.com/ShortListed/', postdata).subscribe( (data) => {
      console.log(data);
    });
    this.http.patch(`http://tekhab.pythonanywhere.com/EmployeeDetails/${this.eyee_id}/`, pacth).subscribe( (data) => {
      console.log(data);
    });
  }

  reject() {
    var data = {
      job_active: false,
    }
    this.http.patch(`http://tekhab.pythonanywhere.com/JobApplied/${this.value1[this.n].id}/`, data ).subscribe( (data) =>{
      console.log(data);
    });
  }

  async presentAlertAccept() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
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
          text: 'Accept',
          handler: () => {
            console.log('Confirm Okay');
            this.accept();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertReject() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Reject!',
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
          text: 'Reject',
          handler: () => {
            console.log('Confirm Okay');
            this.reject();
          }
        }
      ]
    });

    await alert.present();
  }
}
