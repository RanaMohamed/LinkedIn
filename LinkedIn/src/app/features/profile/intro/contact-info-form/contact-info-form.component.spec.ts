import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInfoFormComponent } from './contact-info-form.component';

describe('ContactInfoFormComponent', () => {
  let component: ContactInfoFormComponent;
  let fixture: ComponentFixture<ContactInfoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactInfoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
