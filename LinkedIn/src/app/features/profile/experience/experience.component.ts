import { Component, OnInit } from "@angular/core";
import { ExperienceService } from "./experience.service";
import { Experience } from "src/app/_models/experience";
import { months, getDateDifference } from "src/app/_utilities/utilities";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-experience",
  templateUrl: "./experience.component.html",
  styleUrls: ["./experience.component.scss"]
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];
  formOpened = false;
  selectedExperience: Experience;
  months = months;
  constructor(
    private experienceService: ExperienceService,
    protected activatedRoute: ActivatedRoute,
    protected auth: AuthService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.experienceService
        .getAll(params.id)
        .subscribe(experiences => (this.experiences = experiences));
    });
  }

  editExperience(experience: Experience) {
    this.selectedExperience = experience;
    this.formOpened = true;
  }

  getDateDifference(start, end) {
    return getDateDifference(start, end);
  }

  closeModal() {
    this.selectedExperience = null;
    this.formOpened = false;
  }
}
