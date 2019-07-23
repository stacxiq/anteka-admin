import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercartPage } from './usercart.page';

describe('UsercartPage', () => {
  let component: UsercartPage;
  let fixture: ComponentFixture<UsercartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
