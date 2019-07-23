import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductsPage } from './addproducts.page';

describe('AddproductsPage', () => {
  let component: AddproductsPage;
  let fixture: ComponentFixture<AddproductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddproductsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
