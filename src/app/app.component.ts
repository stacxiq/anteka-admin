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
      icon: 'home'
    },
    {
      title: 'المبيعات ',
      url: '/paid',
      icon: 'home'
    },
    {
      title: 'الطلبات',
      url: '/cart',
      icon: 'home'
    },
    {
      title: 'قائمة الاصدقاء',
      url: '/friends',
      icon: 'home'
    },
    {
      title: 'منتجاتي',
      url: '/adminproducts',
      icon: 'home'
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
