import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  friendChat = firebase.database().ref('/friendchats');
  friend: any;
  friendmessages = [];
  _useroneSignal = firebase.database().ref(`UserOneSignal/`);

  constructor(public events: Events) {

  }

  initializefriend(friend) {
    this.friend = friend;
  }

  addnewmessage(msg) {
    if (this.friend) {
      var promise = new Promise((resolve, reject) => {
        this.friendChat.child('ZSeg05j2Mjh2lbL14YhzROc9FSJ2').child(this.friend.uid).push({
          sentby: 'ZSeg05j2Mjh2lbL14YhzROc9FSJ2',
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          this.friendChat.child(this.friend.uid).child('ZSeg05j2Mjh2lbL14YhzROc9FSJ2').push({
            sentby: 'ZSeg05j2Mjh2lbL14YhzROc9FSJ2',
            message: msg,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          }).then(() => {
            resolve(true);
          })






        })
      })

      return promise;
    }
  }

  getfriendmessages() {
    let temp;
    this.friendChat.child('ZSeg05j2Mjh2lbL14YhzROc9FSJ2').child(this.friend.uid).on('value', (snapshot) => {
      this.friendmessages = [];
      temp = snapshot.val();
      for (var tempkey in temp) {
        this.friendmessages.push(temp[tempkey]);
      }
      this.events.publish('newmessage');
    })
  }

}
