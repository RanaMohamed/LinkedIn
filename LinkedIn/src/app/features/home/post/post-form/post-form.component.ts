import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { User } from "src/app/_models/post";
import { PostService } from "../post.service";

@Component({
  selector: "app-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.scss"]
})
export class PostFormComponent implements OnInit {
  @Input() user: User;
  @Output() closeForm = new EventEmitter();
  confirmCloseOpened = false;
  postForm: FormGroup;
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postForm = new FormGroup({
      description: new FormControl(null, [Validators.maxLength(1300)])
    });
  }

  get description() {
    return this.postForm.get("description");
  }

  submitForm() {
    if (this.postForm.valid) {
      const post = this.postForm.getRawValue();
      post.user = this.user;
      post.images = [];
      post.date = new Date();
      this.postService.add(post);
      this.closeForm.next();
    }
  }

  close() {
    if (this.postForm.touched) {
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
