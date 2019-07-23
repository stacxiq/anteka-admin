import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import $ from 'jquery';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage implements OnInit {
  name: string;
  price: number;
  desc: string;
  category:any;

  constructor(
    public db: AngularFireDatabase,
    public toast: ToastController,
    private camera: Camera,
    public ar:ActivatedRoute,
    public router:Router,
    public load: LoadingController) { }


  ngOnInit(): void {
    console.log('ionViewDidLoad AddfodPage');
    var navh = $(".header").innerHeight();
    console.log(navh);
    this.ar.queryParams.subscribe((data)=>{
      console.log(data.item);
      this.category = data.item;
    });
    console.log(this.category);
  }

  imageurl = "";
  imagecheck = false;
  status = '';
  mySelectedPhoto;
  loading;
  currentPhoto;
  imgSource;

  async addfod() {
    if (this.imageurl.length < 1) {
      this.imageurl = 'https://corporate.oriflame.com/Global/Images%20achive/Products/Bioclinic_hr.jpg';
    }
    await this.db.list(`products/${this.category}`).push({
      name: this.name,
      description: this.desc,
      image: this.imageurl,
      price: this.price,
      status: this.status,
    }).then((data) => {
      console.log(data.key);
      this.db.list(`adminproducts`).push({
        name: this.name,
        description: this.desc,
        image: this.imageurl,
        price: this.price,
        status: this.status,
        category: this.category,
        key: data.key
      });
    }).then(()=>{
      this.presentToast("تم نشر");
      this.router.navigate(['/addproducts']);
    });
  }
  show() {
    if (this.status.length <= 1) {
      return true
    } else {
      return false;
    }
  }
  takePhoto() {
    const options: CameraOptions = {
      targetHeight: 720,
      targetWidth: 720,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {
      this.showloading();
      this.mySelectedPhoto = this.dataURLtoBlob('data:image/jpeg;base64,' + imageData);
      this.upload();

    }, (err) => {
      alert(JSON.stringify(err));
    });
  }


  dataURLtoBlob(myURL) {
    let binary = atob(myURL.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }


  upload() {


    var char = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v"];
    var rand1 = Math.floor(Math.random() * char.length);
    var rand2 = Math.floor(Math.random() * char.length);
    var rand3 = Math.floor(Math.random() * char.length);
    var rand4 = Math.floor(Math.random() * char.length);
    var rand = char[rand1] + char[rand2] + char[rand3] + char[rand4];

    if (this.mySelectedPhoto) {
      var uploadTask = firebase.storage().ref().child('images/' + rand + ".jpg");
      var put = uploadTask.put(this.mySelectedPhoto);
      put.then(() => {
        this.loading.dismiss();

        uploadTask.getDownloadURL().then(url => {

          this.imagecheck = true;
          this.imageurl = url;

        });

      });

      put.catch(err => {
        this.loading.dismiss();

        alert(JSON.stringify(err));
      })


    }
  }

  private async presentToast(message) {
    const toast = await this.toast.create({
      message,
      duration: 3000,
      cssClass: "setdire"
    });
    await toast.present();
  }

  async showloading() {
    this.loading = await this.load.create({
      message: "جاري اضافة الصورة",
      cssClass: "loaddire"
    });
    await this.loading.present();
  }


}
