import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostVideoFormComponent } from './post-video-form.component';

describe('PostVideoFormComponent', () => {
  let component: PostVideoFormComponent;
  let fixture: ComponentFixture<PostVideoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostVideoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostVideoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
