import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsOfInterventionComponent } from './documents-of-intervention.component';

describe('DocumentsOfInterventionComponent', () => {
  let component: DocumentsOfInterventionComponent;
  let fixture: ComponentFixture<DocumentsOfInterventionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentsOfInterventionComponent]
    });
    fixture = TestBed.createComponent(DocumentsOfInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
