import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/servvices/get.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/servvices/authentication.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.page.html',
  styleUrls: ['./employee-profile.page.scss'],
})
export class EmployerProfilePage implements OnInit {
  job_post_toggle: boolean = false;

  details:any = {};
  image1:any;
  image2:any;
  image3:any;

  constructor(private authService: AuthenticationService,
    public menuCtrl: MenuController,
    private http: HttpClient,) { }

  ngOnInit() {
    this.authService.data.then((value) => {
      this.details = value;
      this.http.get(`http://tekhab.pythonanywhere.com/ImageEyerPic/?eyer_id=${value.id}`).subscribe((data: any) => {
        this.image1 = data[0].image;
        this.image2 = data[1].image;
        this.image3 = data[2].image;
      });
    });    
  }

  state() {
    this.job_post_toggle = !this.job_post_toggle;
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
}
