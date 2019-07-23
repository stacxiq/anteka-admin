import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminproductsPage } from './adminproducts.page';

describe('AdminproductsPage', () => {
  let component: AdminproductsPage;
  let fixture: ComponentFixture<AdminproductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminproductsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminproductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
