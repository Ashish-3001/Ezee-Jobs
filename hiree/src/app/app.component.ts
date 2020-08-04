import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { AuthenticationService } from './servvices/authentication.service';
import { Router } from '@angular/router';
import { Plugins, Capacitor } from '@capacitor/core';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})


export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public state: any ="";
  public appPagesEyee = [
    {
      title: 'Home',
      url: '/employee-home',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/employee-home/menu/profile',
      icon: 'person'
    },
    {
      title: 'Favorites',
      url: '/employee-home/menu/favourites',
      icon: 'heart'
    },
    {
      title: 'Application Status',
      url: '/employee-home/menu/apllication-status',
      icon: 'reader'
    },
    {
      title: 'Help',
      url: '/Help',
      icon: 'warning'
    }
  ];

  public appPagesEyer = [
    {
      title: 'Home',
      url: '/employer-profile/employer-home',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/employer-profile/employer-home/menu/profile',
      icon: 'person'
    },
    {
      title: 'Favorites',
      url: '/employer-profile/employer-home/menu/favourites',
      icon: 'heart'
    },
    {
      title: 'Application Status',
      url: '/employer-profile/employer-home/menu/apllication-status',
      icon: 'reader'
    },
    {
      title: 'Help',
      url: '/Help',
      icon: 'warning'
    }
  ];

  constructor(
    private platform: Platform,
    private authService: AuthenticationService,
    private router: Router,
  ) {
    this.initializeApp();
  
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('employer/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPagesEyee.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    this.authService.menu().then((value) => {
      this.state = value;
      console.log(this.state);
    });
  }

  logout() {
    this.authService.logout();
    this.state = null;
  }

}
