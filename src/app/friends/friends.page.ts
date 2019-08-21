import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Events, AlertController, Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChatService } from '../services/chat.service';
import { RequestService } from '../services/request.service';
import { Router } from '@angular/router';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  ngOnInit(): void {
    
    this.requestservice.getmyfriends();
    this.events.subscribe('friends', () => {
      this.loader.presentLoading();
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends;
    });
    this.loader.dismiss();
  }
  myfriends;
  firereq = firebase.database().ref('/requests');
  constructor( 
    public requestservice: RequestService,
    public events: Events,
    public alertCtrl: AlertController,
    public platform: Platform,
    public router:Router,
    public afireauth: AngularFireAuth,
    public loader: LoadingService,
    private chatservice: ChatService) {
  }
  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
    this.events.unsubscribe('friends');
  }
  async accept(item) {
    this.requestservice.acceptrequest(item).then(() => {
      this.alert();
    });
  }

  async alert() {
    const newalert = await this.alertCtrl.create({
      subHeader: 'Friend added',
      message: `Tap on the friend to chat with him`,
      buttons: ['Okay']
    });
    await newalert.present();
  }

  ignore(item) {
    this.requestservice.deleterequest(item).then(() => {

    }).catch((err) => {
      alert(err);
    })
  }
  friendchat(myfriends) {
    this.chatservice.initializefriend(myfriends);
    // this.navCtrl.push(ChatPage);
    this.router.navigate(['/chat']);

  }


}
