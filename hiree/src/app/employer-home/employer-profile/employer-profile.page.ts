import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.page.html',
  styleUrls: ['./employer-profile.page.scss'],
})
export class EmployerProfilePage implements OnInit {
  details: object = [{ }] ;

  constructor() { }

  ngOnInit() {
    
  }

}
