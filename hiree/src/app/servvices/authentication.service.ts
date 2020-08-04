import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { GetService } from './get.service';


const TOKEN_KEY = 'auth-token';
const DATA_KEY = 'n';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);

  constructor(
    private storage: Storage,
    private platform: Platform,
    private router: Router,
    private http:HttpClient,
    )
  {
    this.platform.ready().then(() => {
      this.check();
    });
  } 

  login(type:string, user_id: number) {
    if(type == 'employee'){
      this.http.get('http://tekhab.pythonanywhere.com/EmployeeDetails/').subscribe( (data) =>{
        for(var j=0; j >=0;j++) {
          if(user_id == data[j].user_id) {
            this.storage.set(DATA_KEY, data[j] ).then(res => {
            });
            break;
          }
        }
      });
    }
    else if(type == 'employer') {
      this.http.get('http://tekhab.pythonanywhere.com/EmployerDetails/').subscribe( (data) =>{
        for(var j=0; j >=0;j++) {
          if(user_id == data[j].user_id) {
            this.storage.set(DATA_KEY, data[j] ).then(res => {
            });
            break;
          }
        }
      });
    }
    this.storage.set(TOKEN_KEY, type ).then(res => {
      this.authenticationState.next(true);
    });
    this.menu();
  }

  logout() {
    this.router.navigate(['login']);
    this.storage.remove(DATA_KEY);
    return this.storage.remove(TOKEN_KEY).then(res => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  check() {
    return this.storage.get(TOKEN_KEY).then(res => {
      if(res == 'employee') {
        this.authenticationState.next(true);
        this.router.navigate(['/employee-home']);
      }
      else if (res == 'employer') {
        this.authenticationState.next(true);
        this.router.navigate(['employer-profile/employer-home']);
      }
    });
  }

  menu() {
    return this.storage.get(TOKEN_KEY).then(res => {
      if(res == 'employee') {
        return res;
      }
      else if (res == 'employer') {
        return res;
      }
    });
  }

  get data() {
    return this.storage.get(DATA_KEY).then(res => {
      return res;
    });
  }

}
