import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  list: Observable<any>;
  category:any;
  ngOnInit(): void {
    this.ar.queryParams.subscribe((data)=>{
      console.log(data.item);
      this.category = data.item;
      this.list = this.db.list(`waitingproducts/${data.item}`).snapshotChanges();

    });
    console.log(this.category);
  }
  constructor(
    public db: AngularFireDatabase,
    public ar:ActivatedRoute,
     public alert: AlertController,
    public toast: ToastController) {



  }


  async del(item: any) {
    const alert = await this.alert.create({
      message: "هل انت متأكد من حذف ؟",
      cssClass: "setdire",
      buttons: [{
        text: "حذف", handler: () => {
          this.db.list(`waitingproducts/${this.category}`).remove(item).then(OmarReal => {
            this.presentToast("تم حذف");
          })
        }
      }, "الغاء"]
    });
    await alert.present();
  }
  add(item, key) {
    this.db.list(`products/${this.category}`).push(item).then(OmarReal => {
      this.db.list(`waitingproducts/${this.category}`).remove(key).then(() => {
        this.presentToast("تم");
      })

    });
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
