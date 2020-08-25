import { Component, OnInit } from '@angular/core';

import { Platform, AlertController, NavController} from '@ionic/angular';
import { AuthenticationService } from './servvices/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Plugins, Capacitor } from '@capacitor/core';

const { App } = Plugins;

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
      url: '/help',
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
      url: '/help',
      icon: 'warning'
    }
  ];

  constructor(
    private platform: Platform,
    private authService: AuthenticationService,
    private router: Router,
    public alertController: AlertController,
    private navController:NavController,
  ) {
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
      this.authService.check();
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
    this.platform.backButton.subscribeWithPriority(97, ()  => {
      this.navigation();
    });
  }

  logout() {
    this.authService.logout();
    this.state = null;
  }

  async presentAlertExit() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Exit',
      message: 'Are you <strong>Sure</strong> you want to <strong>Exit</strong> the app!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Exit',
          handler: () => {
            App.exitApp();
          }
        }
      ]
    });

    await alert.present();
  }
  
  navigation() {
    this.authService.menu().then((value) => { 
      if(value == 'employer') {
        if(this.router.url.toString() == '/employer-profile/employer-home') {
          this.presentAlertExit();
        }
      }
      else if(value == 'employee') {
        if(this.router.url.toString() == '/employee-home') {
          this.presentAlertExit();
        }
      }
      else {
        return;
      }
    });
  }

}
