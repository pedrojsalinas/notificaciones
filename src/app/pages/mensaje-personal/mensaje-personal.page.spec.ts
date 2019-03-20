import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajePersonalPage } from './mensaje-personal.page';

describe('MensajePersonalPage', () => {
  let component: MensajePersonalPage;
  let fixture: ComponentFixture<MensajePersonalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajePersonalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajePersonalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
