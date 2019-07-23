import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AlertController, ToastController } from '@ionic/angular';
import $ from 'jquery';

@Component({
  selector: 'app-adminproducts',
  templateUrl: './adminproducts.page.html',
  styleUrls: ['./adminproducts.page.scss'],
})
export class AdminproductsPage implements OnInit {
  list: Observable<any>;
  constructor(
    public db: AngularFireDatabase, 
    public alert: AlertController,
    public toast: ToastController) { }

  ngOnInit(): void {
    var winh = $(window).height();
    var navh = $(".tabs-md .tab-button").innerHeight();

    this.list = this.db.list(`adminproducts`).snapshotChanges();
    console.log(this.list);
  }

  async del(item: any, cat, key) {
    const alert = await this.alert.create({
      message: "هل انت متأكد من حذف ؟",
      cssClass: "setdire",
      buttons: [{
        text: "حذف", handler: () => {
          this.db.list(`adminproducts`).remove(item).then(OmarReal => {
            this.db.list(`products/${cat}`).remove(key);
            this.presentToast("تم حذف");
          })
        }
      }, "الغاء"]
    });
    await alert.present();
  }

  private async presentToast(message) {
    const toast = await this.toast.create({
      message,
      duration: 3000,
      cssClass: "setdire"
    });
    await toast.present();
  }



}
