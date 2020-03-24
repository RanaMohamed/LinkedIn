import { Component, OnInit } from "@angular/core";
import { Education } from "src/app/_models/education";
import { EducationService } from "./education.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-education",
  templateUrl: "./education.component.html",
  styleUrls: ["./education.component.scss"]
})
export class EducationComponent implements OnInit {
  formOpened = false;
  educations: Education[] = [];
  selectedEducation: Education = null;
  constructor(
    private educationService: EducationService,
    protected activatedRoute: ActivatedRoute,
    protected auth: AuthService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.educationService.getAll(params.id).subscribe(ed => {
        this.educations = ed;
      });
    });
  }

  editEducation(ed) {
    this.selectedEducation = ed;
    this.formOpened = true;
  }

  closeModal() {
    this.selectedEducation = null;
    this.formOpened = false;
  }
}
