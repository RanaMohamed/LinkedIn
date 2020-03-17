import { Component, OnInit, Input } from "@angular/core";
import { Post, User } from "src/app/_models/post";
import * as moment from "moment";
import { AuthService } from "src/app/features/auth/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostService } from "../post.service";

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
}
