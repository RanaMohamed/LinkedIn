import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostImageFormComponent } from './post-image-form.component';

describe('PostImageFormComponent', () => {
  let component: PostImageFormComponent;
  let fixture: ComponentFixture<PostImageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostImageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostImageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
