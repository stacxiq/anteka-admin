import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import {StatusBar } from '@ionic-native/status-bar/ngx';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import * as $ from 'jquery';
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
    private statusBar: StatusBar,
    private keyboard: Keyboard,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      this.keyboard.hideFormAccessoryBar(true);
      this.keyboard.setResizeMode('ionic');
      this.splashScreen.hide();
    });
  }
  ngAfterViewInit() {
    // This element never changes.
    let ionapp = document.getElementsByTagName("ion-app")[0];

    window.addEventListener('keyboardDidShow', async (event) => {
        // Move ion-app up, to give room for keyboard
        let kbHeight: number = event["keyboardHeight"] / 8 ;
        let viewportHeight: number = $(window).height();
        let inputFieldOffsetFromBottomViewPort: number = viewportHeight - $(':focus')[0].getBoundingClientRect().bottom;
        let inputScrollPixels = kbHeight - (inputFieldOffsetFromBottomViewPort * 3 );

        // Set margin to give space for native keyboard.
        ionapp.style["margin-bottom"] = kbHeight.toString() + "px";

        // But this diminishes ion-content and may hide the input field...
        if (inputScrollPixels > 0) {
            // ...so, get the ionScroll element from ion-content and scroll correspondingly
            // The current ion-content element is always the last. If there are tabs or other hidden ion-content elements, they will go above.
            let ionScroll = await $("ion-content").last()[0].getScrollElement();
            setTimeout(() => {
                $(ionScroll).animate({
                    scrollTop: ionScroll.scrollTop + inputScrollPixels
                }, 300);
            }, 300); // Matches scroll animation from css.
        }
    });
    window.addEventListener('keyboardDidHide', () => {
        // Move ion-app down again
        // Scroll not necessary.
        ionapp.style["margin-bottom"] = "0px";
    });
}
}
