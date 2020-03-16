import { Component, OnInit } from "@angular/core";
import { Post, User } from "src/app/_models/post";
import { PostService } from "./post/post.service";
const moment = require("moment");

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  moment = moment;
  formOpened = false;
  user: User = {
    name: "Rana Mohamed",
    headline: "Web and UI Student at Information Technology Institute (ITI)",
    image:
      "https://media-exp1.licdn.com/dms/image/C4E03AQFksu7c46jpMw/profile-displayphoto-shrink_100_100/0?e=1590019200&v=beta&t=mk9MYi7svRtZ9ph1tafi_j-4Ix--HAI_MYmoDBp_tKY"
  };
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getAll().subscribe(posts => (this.posts = posts));
  }

  closeModal() {
    this.formOpened = false;
  }
}
