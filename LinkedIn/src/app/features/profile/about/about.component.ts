import { Component, OnInit } from "@angular/core";
import { About } from "./../../../_models/about";
import { AboutService } from "./about.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

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
  constructor(
    private aboutService: AboutService,
    protected activatedRoute: ActivatedRoute,
    protected auth: AuthService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.aboutService.getById(params.id).subscribe(ab => {
        ab[0] ? (this.about = ab[0]) : "";
      });
    });
  }
  closeModal() {
    this.openForm = false;
  }
}
