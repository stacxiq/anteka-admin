import { Component, OnInit } from '@angular/core';
import { ExtraService } from '../services/extra.service';

@Component({
  selector: 'app-paiddetail',
  templateUrl: './paiddetail.page.html',
  styleUrls: ['./paiddetail.page.scss'],
})
export class PaiddetailPage implements OnInit {

  product: any;

  constructor(public extra:ExtraService) { }

  ngOnInit() {
    this.product = this.extra.getExtras();
  }

}
