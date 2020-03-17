import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutFormComponent } from './about-form.component';

describe('AboutFormComponent', () => {
  let component: AboutFormComponent;
  let fixture: ComponentFixture<AboutFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
