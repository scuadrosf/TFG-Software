import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInterventionComponent } from './edit-intervention.component';

describe('EditInterventionComponent', () => {
  let component: EditInterventionComponent;
  let fixture: ComponentFixture<EditInterventionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInterventionComponent]
    });
    fixture = TestBed.createComponent(EditInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
