import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.page.html',
  styleUrls: ['./addproducts.page.scss'],
})
export class AddproductsPage implements OnInit {

  constructor(public router: Router,

    ) { }

  ngOnInit() {
  }

  buy(item: string) {
      this.router.navigate(['/addproduct'], {
        queryParams: { item },
      });
    }

}
