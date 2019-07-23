import { Component, OnInit, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { Camera } from '@ionic-native/camera/ngx';
import { RequestService } from '../services/request.service';
import { Platform, AlertController, Events, LoadingController } from '@ionic/angular';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  buddy: any;
  newmessage;
  key: any;
  allmessages = [];
  res = [];
  ses = [];
  photoURL;
  imgornot;
  imgfile: any;
  imageurl;
  mySelectedPhoto;
  imagecheck;
  show = false;
  constructor( public chatservice: ChatService,
    public events: Events, 
    public zone: NgZone, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public keys: RequestService,
    public camera: Camera
  ) {
    if (this.platform.ready) {
      this.buddy = this.chatservice.friend;
      this.photoURL = 'http://facebookfplus.com/upload/images/600_97d118b7a6f8f87d18f7b1385ea7665e.png';
      this.events.subscribe('newmessage', () => {
        this.allmessages = [];
        this.imgornot = [];
        this.zone.run(() => {
          this.allmessages = this.chatservice.friendmessages;
          for (var key in this.allmessages) {
            if (this.allmessages[key].message.substring(0, 4) == 'http')
              this.imgornot.push(true);
            else
              this.imgornot.push(false);
          }
        })


      })
    }
  }

  addmessage() {
    //this.newmessage
    this.chatservice.addnewmessage(this.newmessage).then(() => {
      //this.content.scrollToBottom();
      this.newmessage = '';
    })
  }

  ngOnInit(): void {
    this.chatservice.getfriendmessages();
    console.log(this.chatservice.getfriendmessages());
  }


}
