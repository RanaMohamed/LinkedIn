import { Component, OnInit, Input } from "@angular/core";
import * as moment from "moment";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Post, User } from "src/app/_models/post";
import { PostService } from "../post.service";
import { AuthService } from "src/app/features/auth/auth.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"]
})
export class PostComponent implements OnInit {
  @Input() post: Post = {};
  commentsOpened = false;
  moment = moment;
  user: User;
  commentForm: FormGroup;
  startSlide = 0;
  sliderOpened = false;
  optionsOpened = false;
  confirmDeleteOpened = false;
  editPostOpened = false;
  constructor(private postService: PostService, private auth: AuthService) {}

  ngOnInit() {
    this.user = this.auth.getLoggedUser();
    this.commentForm = new FormGroup({
      comment: new FormControl(null, [
        Validators.maxLength(1300),
        Validators.required
      ])
    });
  }

  get comment() {
    return this.commentForm.get("comment");
  }

  submitForm() {
    if (this.commentForm.valid) {
      const comment = this.commentForm.getRawValue();
      comment.user = this.user;
      comment.date = new Date();
      this.postService.addComment(this.post.id, comment);
      this.commentForm.reset();
    }
  }

  likePost() {
    this.postService.likePost(this.post.id);
  }

  confirmDelete(confirm: boolean) {
    if (confirm) {
      this.postService.delete(this.post.id);
    } else {
      this.confirmDeleteOpened = false;
    }
  }
}
