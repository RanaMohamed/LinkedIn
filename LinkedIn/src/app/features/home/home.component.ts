import { Component, OnInit } from "@angular/core";
import { Post, User } from "src/app/_models/post";
import { PostService } from "./post/post.service";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  formOpened = false;
  imageFormOpened = false;
  user: User = {};
  constructor(private postService: PostService, private auth: AuthService) {}

  ngOnInit() {
    this.postService.getAll().subscribe(posts => (this.posts = posts));
    this.user = this.auth.getLoggedUser();
  }

  closeModal() {
    this.formOpened = false;
    this.imageFormOpened = false;
  }
}
