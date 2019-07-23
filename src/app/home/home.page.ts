import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})





export class HomePage implements OnInit {

  constructor(public router: Router,

    ) { }

  ngOnInit() {
  }

  buy(item: string) {
      this.router.navigate(['/products/'], {
        queryParams: { item },
      });
    }
  }
