import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cartdetail',
  templateUrl: './cartdetail.page.html',
  styleUrls: ['./cartdetail.page.scss'],
})
export class CartdetailPage implements OnInit {

  uid: any;
  list: Observable<any>;
  constructor(  public db: AngularFireDatabase,
     public alert: AlertController,
      public ar:ActivatedRoute,
      public toast: ToastController) {
  }

  ngOnInit() {
    // this.uid = this.navParams.data;
    this.ar.queryParams.subscribe((data)=>{
      console.log(data.id);
      this.list = this.db.list(`cart/${data.id}`).snapshotChanges();

    });
  }

  async req_done(key) {
    console.log(key)
    const alert = await this.alert.create({
      message: " سوف يؤدي ذلك الى حذف الطلب ",
      cssClass: "setdire",
      buttons: [{
        text: "حذف", handler: () => {
          this.db.list(`cart/${this.uid}`).remove(key);
          this.presentToast("تم حذف");
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
