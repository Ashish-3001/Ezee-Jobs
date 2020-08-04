import { Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  ElementRef, 
  Renderer2} from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit {
  
  @ViewChild('map',{static: false}) mapElementRef: ElementRef;
  

  constructor(private modalCtrl: ModalController, private render: Renderer2) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.getGooleMaps().then(googleMaps => {
      const mapEl = this.mapElementRef.nativeElement;
      const map = new googleMaps.Map(mapEl, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 16
      });
      googleMaps.event.addListenerOnce(map, 'idle', () => {
        this.render.addClass(mapEl, 'visible');
      });
    }).catch(err => {
      console.log(err);
    });
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  private getGooleMaps(): Promise<any> {
    const win = window as any;
    const googleModul = win.google;
    if(googleModul && googleModul.maps) {
      return Promise.resolve(googleModul.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCHc83Rs5XXnqb6nYe1y4qS-zxszKP88Cc';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule  = win.google;
        if(loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        }
        else {
          reject('Google maps SDK not available');
        }
      }
    })
  }
}
