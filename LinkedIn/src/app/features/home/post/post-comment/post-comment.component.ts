import { Component, OnInit, Input } from "@angular/core";
import * as moment from "moment";

import { Comment } from "src/app/_models/post";
import { PostService } from "../post.service";

@Component({
  selector: "app-post-comment",
  templateUrl: "./post-comment.component.html",
  styleUrls: ["./post-comment.component.scss"]
})
export class PostCommentComponent implements OnInit {
  @Input() comment: Comment;
  @Input() postId: number;
  moment = moment;
  optionsOpened = false;
  confirmDeleteOpened = false;
  constructor(private postService: PostService) {}

  ngOnInit() {}

  confirmDelete(confirm: boolean) {
    if (confirm) {
      this.postService.deleteComment(this.comment.id, this.postId);
    } else {
      this.confirmDeleteOpened = false;
    }
  }
}
