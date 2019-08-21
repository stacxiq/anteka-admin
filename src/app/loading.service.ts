import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
constructor(public loadingController: LoadingController) { }

async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'يرجى الانتظار ...',
    spinner: 'circles',
    duration: 3000
  });
  await loading.present();
}
async dismiss() {
  await this.loadingController.dismiss();
}
}
