import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-paid',
  templateUrl: './paid.page.html',
  styleUrls: ['./paid.page.scss'],
})
export class PaidPage implements OnInit {
  list: Observable<any>;
  arr = [];
  constructor(
    public db: AngularFireDatabase,
    public router: Router,
    public extra:ExtraService,
  ) {
  }


  ngOnInit(): void {
    this.list = this.db.list(`paid`).snapshotChanges();
    this.list.subscribe((data: any) => {
      data.forEach(element => {
        this.arr.push(element.payload.val());
      });
      this.arr = this.arr.reverse();

    });
  }

  desc(item) {
    console.log(item);
    this.extra.setExtras(item);
    // this.navCtrl.push(PaiddetailPage, item);
    this.router.navigate(['/paiddetail']);
  }

}
