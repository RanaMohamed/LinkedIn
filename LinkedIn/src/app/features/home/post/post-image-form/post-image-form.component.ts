import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Post } from "src/app/_models/post";
import { PostService } from "../post.service";
import { AuthService } from "src/app/features/auth/auth.service";

@Component({
  selector: "app-post-image-form",
  templateUrl: "./post-image-form.component.html",
  styleUrls: ["./post-image-form.component.scss"]
})
export class PostImageFormComponent implements OnInit {
  @Output() closeForm = new EventEmitter();
  confirmCloseOpened = false;
  imageForm: FormGroup = new FormGroup({});
  images: string[] = [];
  files: File[] = [];
  activeSlide = 0;
  Math = Math;
  constructor(private postService: PostService, private auth: AuthService) {}

  ngOnInit() {}

  onFileChange(event) {
    this.images = [];
    this.files = Array.from(event.target.files);
    if (event.target.files && event.target.files.length < 9) {
      this.files.map(image => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
          this.images.push(reader.result.toString());
        };
      });
    }
  }

  submitForm() {
    const post: Post = {};
    post.user = this.auth.getLoggedUser();
    post.images = this.images;
    post.date = new Date();
    this.postService.add(post);
    this.closeForm.next();
  }

  close() {
    if (!this.confirmCloseOpened) {
      this.confirmCloseOpened = true;
    } else {
      this.closeForm.next();
    }
  }

  confirmClose(confirm: boolean) {
    if (confirm) {
      this.closeForm.next();
    } else {
      this.confirmCloseOpened = false;
    }
  }
}
