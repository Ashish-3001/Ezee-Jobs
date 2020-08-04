import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/servvices/authentication.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-application-status',
  templateUrl: './application-status.page.html',
  styleUrls: ['./application-status.page.scss'],
})
export class ApplicationsRecPage implements OnInit {
  eyer_id: number;
  results_job:any;

  constructor(private authService: AuthenticationService,
    public menuCtrl: MenuController,
    private http:HttpClient) { }

  ngOnInit() {
    this.authService.data.then((value) => {
      this.eyer_id = value.id;
      this.http.get(`http://tekhab.pythonanywhere.com/JobPost/?eyer_id=${value.id}&job_active=true`).subscribe((data)=>{
       this.results_job = data;
      });
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.ngOnInit();
  }

}
