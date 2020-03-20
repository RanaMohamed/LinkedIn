import { Component, OnInit, Input } from "@angular/core";
import * as moment from "moment";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Post } from "src/app/_models/post";
import { PostService } from "../post.service";
import { AuthService } from "src/app/features/auth/auth.service";
import { Intro } from "src/app/_models/intro";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"]
})
export class PostComponent implements OnInit {
  @Input() post: Post = {};
  @Input() user: Intro = {};
  commentsOpened = false;
  moment = moment;
  commentForm: FormGroup;
  startSlide = 0;
  sliderOpened = false;
  optionsOpened = false;
  confirmDeleteOpened = false;
  editPostOpened = false;
  comments: Comment[] = [];
  constructor(private postService: PostService, protected auth: AuthService) {}

  ngOnInit() {
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

  openComments() {
    this.commentsOpened = !this.commentsOpened;
    if (this.commentsOpened) {
      this.postService
        .getComments(this.post.id)
        .subscribe(res => (this.post.comments = res));
    }
  }

  submitForm() {
    if (this.commentForm.valid) {
      const comment = this.commentForm.getRawValue();
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
