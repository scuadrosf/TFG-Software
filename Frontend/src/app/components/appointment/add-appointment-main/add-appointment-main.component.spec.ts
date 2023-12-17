import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppointmentMainComponent } from './add-appointment-main.component';

describe('AddAppointmentMainComponent', () => {
  let component: AddAppointmentMainComponent;
  let fixture: ComponentFixture<AddAppointmentMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAppointmentMainComponent]
    });
    fixture = TestBed.createComponent(AddAppointmentMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
