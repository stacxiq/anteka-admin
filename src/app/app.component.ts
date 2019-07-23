import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'اداره منتجات الاعضاء',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'اضافه منتجات انتيكا',
      url: '/addproducts',
      icon: 'add'
    },
    {
      title: 'المبيعات ',
      url: '/paid',
      icon: 'card'
    },
    {
      title: 'الطلبات',
      url: '/cart',
      icon: 'checkmark'
    },
    {
      title: 'قائمة الاصدقاء',
      url: '/friends',
      icon: 'people'
    },
    {
      title: 'منتجاتي',
      url: '/adminproducts',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
