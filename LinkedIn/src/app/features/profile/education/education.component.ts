import { Component, OnInit } from "@angular/core";
import { Education } from "src/app/_models/education";
import { EducationService } from "./education.service";

@Component({
  selector: "app-education",
  templateUrl: "./education.component.html",
  styleUrls: ["./education.component.scss"]
})
export class EducationComponent implements OnInit {
  formOpened = false;
  education: Education[] = [];
  selectedEducation: Education = null;
  constructor(private educationService: EducationService) {}

  ngOnInit() {
    this.educationService.getAll().subscribe(ed => {
      this.education = ed;
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
