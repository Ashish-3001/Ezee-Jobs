import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetService } from 'src/app/servvices/get.service';
import { HttpClient } from '@angular/common/http';

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

  constructor(private acitivatedRoute: ActivatedRoute, private job_details: GetService, private http: HttpClient) { }

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
        console.log(data.eyer_id);
        this.http.get(`http://tekhab.pythonanywhere.com/ImageEyerPic/?eyer_id=${data.eyer_id}`).subscribe((data: any) => {
          console.log(data);
          this.image1 = data[0].image;
          this.image2 = data[1].image;
          this.image1 = data[2].image;
        });
      });
    });
  }
  

}
