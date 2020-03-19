import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User, Post } from "src/app/_models/post";
import { PostService } from "../post.service";

@Component({
  selector: "app-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.scss"]
})
export class PostFormComponent implements OnInit {
  @Input() user: User;
  @Input() post: Post;
  @Input() imageFormOpened: boolean;
  @Input() videoFormOpened: boolean;
  @Output() closeForm = new EventEmitter();
  confirmCloseOpened = false;
  postForm: FormGroup;
  images: string[] = [];
  video: string;
  startSlide = 0;
  sliderOpened = false;
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postForm = new FormGroup({
      description: new FormControl(this.post && this.post.description, [
        Validators.maxLength(1300)
      ])
    });
    if (this.post) {
      this.images = this.post.images;
      this.video = this.post.video;
    }
  }

  get description() {
    return this.postForm.get("description");
  }

  submitForm() {
    if (this.postForm.valid) {
      let post = this.postForm.getRawValue();
      post.images = this.images;
      post.video = this.video;
      if (this.post) {
        post = { ...this.post, ...post };
        this.postService.edit(post);
      } else {
        post.user = this.user;
        post.date = new Date();
        this.postService.add(post);
      }
      this.closeForm.next();
    }
  }

  close() {
    if (!this.sliderOpened) {
      if (this.postForm.dirty || this.images.length > 0) {
        this.confirmCloseOpened = true;
      } else {
        this.closeForm.next();
      }
    }
  }

  confirmClose(confirm: boolean) {
    if (confirm) {
      this.closeForm.next();
    } else {
      this.confirmCloseOpened = false;
    }
  }

  closeImageModal(e) {
    this.images = e;
    this.imageFormOpened = false;
  }

  closeVideoModal(e) {
    this.video = e;
    this.videoFormOpened = false;
  }
}
