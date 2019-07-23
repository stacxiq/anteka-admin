import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Events } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  firereq = firebase.database().ref('/requests');
  firefriends = firebase.database().ref('/friends');
  firedata = firebase.database().ref('/users');
  userdetails;
  myfriends;
  mrequest
  allusers: any;
  constructor(private events: Events, private af: AngularFireAuth) {
    console.log('Hello RequestProvider Provider');
  }
  getmyrequests() {
    let allmyrequests;
    this.firereq.child('ZSeg05j2Mjh2lbL14YhzROc9FSJ2').on('value', (snapshot) => {
      allmyrequests = snapshot.val();
      this.mrequest = [];
      for (var i in allmyrequests) {
        this.mrequest.push(allmyrequests[i].sender);
        console.log(allmyrequests[i].sender);
      }
      this.getallusers().then((res) => {
        this.allusers = res;
        console.log(res);
        this.userdetails = [];
        for (var j in this.mrequest)
          for (var key in this.allusers) {
            if (this.mrequest[j] == this.allusers[key].uid) {
              this.userdetails.push(this.allusers[key]);
            }
          }
        this.events.publish('gotrequests');
      })
      return this.mrequest;
    })

  }
  acceptrequest(buddy) {
    var promise = new Promise((resolve, reject) => {
      this.myfriends = [];
      this.firefriends.child(firebase.auth().currentUser.uid).push({
        uid: buddy.uid,
      }).then(() => {
        this.firefriends.child(buddy.uid).push({
          uid: firebase.auth().currentUser.uid,
          chat: true
        }).then(() => {
          this.deleterequest(buddy).then(() => {
            resolve(true);
          })

        })
      })
    })
    return promise;
  }
  deleterequest(buddy) {
    var promise = new Promise((resolve, reject) => {
      this.firereq.child(firebase.auth().currentUser.uid).orderByChild('sender').equalTo(buddy.uid).once('value', (snapshot) => {
        let somekey;
        for (var key in snapshot.val())
          somekey = key;
        this.firereq.child(firebase.auth().currentUser.uid).child(somekey).remove().then(() => {
          resolve(true);
        })
      })
        .then(() => {

        }).catch((err) => {
          reject(err);
        })
    })
    return promise;
  }
  getmyfriends() {
    let friendsuid = [];
    this.firefriends.child('ZSeg05j2Mjh2lbL14YhzROc9FSJ2').on('value', (snapshot) => {
      let allfriends = snapshot.val();
      this.myfriends = [];
      for (var i in allfriends)
        friendsuid.push(allfriends[i].uid);
      this.getallusers().then((users: any) => {
        this.myfriends = [];
        for (var j in friendsuid)
          for (var key in users) {
            if (friendsuid[j] === users[key].uid) {
              this.myfriends.push(users[key]);
            }
          }
        this.events.publish('friends');
      }).catch((err) => {
        alert(err);
      })

    })
  }
  getallusers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let arr = [];
        for (var key in userdata) {
          arr.push(userdata[key]);
        }
        resolve(arr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

}
