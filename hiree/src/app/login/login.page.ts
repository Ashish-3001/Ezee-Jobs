import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, NavController, ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetService } from '../servvices/get.service';
import { AuthenticationService } from '../servvices/authentication.service';
import { AppComponent } from '../app.component';
import { NgForm, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { OtpVerifyComponent } from '../shared/otp-verify/otp-verify.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  verify = "";
  public login_id = "";
  dat: any;
  i:number = 0;

  constructor(public menuCtrl: MenuController, 
     private http: HttpClient, 
     public navCtrl: NavController,
     private login: GetService,
     private authService: AuthenticationService,
     private menu: AppComponent,
     private modalCtrl: ModalController,
     private router: Router,
     ) { 
 
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  LogIn_var(form: NgForm) {
    var login_id = form.value.login_id; 
    
    this.http.get('http://tekhab.pythonanywhere.com/UserLogin/').subscribe( (data) =>{      
      this.dat = data;
      var state:boolean;
      for(this.i; this.i >= 0; this.i++){
        if(this.dat[this.i]) {
          if(login_id == this.dat[this.i].user_phone_no){
            this.authService.login(this.dat[this.i].user_type, this.dat[this.i].id);
            this.login.logged_user_id.next(this.dat[this.i].id);
            var postdata = {
              "phone":this.dat[this.i].user_phone_no
            }
            this.http.post('http://tekhab.pythonanywhere.com/validate-otp/',postdata).subscribe( (data:any)=> {
              var otp =data.otp.toString();
              this.login.otp_verification.next(otp);
              this.login.eyer_time.next(data.time)
            })
            this.modalCtrl.create({component: OtpVerifyComponent }).then(modalEl => {
              modalEl.present();
            });
            state = true;
            this.i=0;
            break;
          }
        }
        else {
          this.i=0;
          state = false;
          break;
        }
      }
      if(state== false) {
        this.router.navigate(['register']);
      }
    });
    
  }

  ionViewWillLeave() {
    this.menu.ngOnInit();
  }

}
 