import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/servvices/authentication.service';
import { MenuController } from '@ionic/angular';

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
    private authService: AuthenticationService) 
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
                console.log(this.results);
              });
            }
            this.k++;
            console.log(this.k);
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
        this.http.patch(`http://tekhab.pythonanywhere.com/EmployerDetailsFav/${this.fav[i].id}/`, pacthdata).subscribe( () => { 
          console.log("success");
        });
        const index = this.selectedIndex.indexOf(f);
        if (index > -1) {
          this.selectedIndex.splice(index, 1);
          console.log(this.selectedIndex);
        }

        const index2 = this.results.indexOf(this.results[a]);
        if (index2 > -1) {
          console.log(index2);
          this.results.splice(index2, 1);
          console.log(this.results);
        }
      }
    }
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
}
