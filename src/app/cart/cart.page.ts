import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  users: any = [];
  items: any;
  constructor(private db: AngularFireDatabase, private router: Router
  ) { }

  ngOnInit(): void {
    this.db.object(`cart`).snapshotChanges().subscribe(c => {
      this.users = c.payload.val();
      let index = 0;
      this.items = [];
      for (let i in this.users) {
        // console.log(i + '------------'+ this.users[i]);
        this.db.list(`users/${i}`).valueChanges().subscribe(data => {
          this.items.push(data);
        })
      }
    });
  }

  passid(id) {
    this.router.navigate(['/cartdetail'], {
      queryParams: { id },
    });
  }


}
