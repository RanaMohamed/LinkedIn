import { Component, OnInit } from "@angular/core";
import { About } from "./../../../_models/about";
import { AboutService } from "./about.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {
  about: About = {
    summary: "",
    media: [],
    link: ""
  };
  openForm = false;
  constructor(private aboutService: AboutService) {}

  ngOnInit() {
    this.aboutService.getById(1).subscribe(ab => (this.about = ab));
  }

  closeModal() {
    this.openForm = false;
  }
}
