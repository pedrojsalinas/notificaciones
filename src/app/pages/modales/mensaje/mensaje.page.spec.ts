import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajePage } from './mensaje.page';

describe('MensajePage', () => {
  let component: MensajePage;
  let fixture: ComponentFixture<MensajePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
