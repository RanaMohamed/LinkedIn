import { Component, OnInit } from "@angular/core";
import { Post } from "src/app/_models/post";
import { PostService } from "./post/post.service";
import { AuthService } from "../auth/auth.service";
import { Intro } from "src/app/_models/intro";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  formOpened = false;
  imageFormOpened = false;
  videoFormOpened = false;
  user: Intro = {};
  constructor(private postService: PostService, private auth: AuthService) {}

  ngOnInit() {
    this.postService.getAll().subscribe(posts => (this.posts = posts));
    this.auth.getLoggedUser().subscribe(res => (this.user = res));
  }

  closeModal() {
    this.formOpened = false;
    this.imageFormOpened = false;
    this.videoFormOpened = false;
  }
}
