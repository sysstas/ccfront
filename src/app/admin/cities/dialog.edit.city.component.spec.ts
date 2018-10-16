import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dialog.Edit.CityComponent } from './dialog.edit.city.component';

describe('Dialog.Edit.CityComponent', () => {
  let component: Dialog.Edit.CityComponent;
  let fixture: ComponentFixture<Dialog.Edit.CityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dialog.Edit.CityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dialog.Edit.CityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
