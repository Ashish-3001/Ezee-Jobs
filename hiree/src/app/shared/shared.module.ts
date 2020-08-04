import { NgModule } from '@angular/core';
import { MapModalComponent } from './map-modal/map-modal.component';
import { LocationPickerComponent } from './Picker/location-picker/location-picker.component';
import { CommonModule } from '@angular/common';
import { ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { OtpVerifyComponent } from './otp-verify/otp-verify.component';
import { FormsModule } from '@angular/forms';
import { ImagePickerComponent } from './image-picker/image-picker.component';

@NgModule({
    declarations: [LocationPickerComponent,MapModalComponent,OtpVerifyComponent,ImagePickerComponent],
    imports: [CommonModule, IonicModule, FormsModule,],
    exports: [LocationPickerComponent, MapModalComponent, ImagePickerComponent],
    entryComponents: [MapModalComponent,OtpVerifyComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule{}