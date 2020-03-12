import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ExperienceService } from "../experience.service";
import { Experience } from "src/app/_models/experience";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import {
  months,
  years,
  rangeValidator
} from "../../../../_utilities/utilities";

@Component({
  selector: "app-experience-form",
  templateUrl: "./experience-form.component.html",
  styleUrls: ["./experience-form.component.scss"]
})
export class ExperienceFormComponent implements OnInit {
  @Input() experience: Experience;
  @Output() closeForm = new EventEmitter();
  experienceForm: FormGroup;
  linkOpened = false;
  confirmDeleteOpened = false;
  confirmCloseOpened = false;
  years = years(1990, 2020);
  months = months;
  constructor(private experienceService: ExperienceService) {}

  ngOnInit() {
    this.experienceForm = new FormGroup(
      {
        title: new FormControl(this.experience && this.experience.title, [
          Validators.required
        ]),
        type: new FormControl(this.experience && this.experience.type),
        company: new FormGroup({
          name: new FormControl(
            this.experience && this.experience.company.name,
            [Validators.required]
          )
        }),
        location: new FormControl(this.experience && this.experience.location),
        start: new FormGroup({
          month: new FormControl(
            this.experience && this.experience.start.month
          ),
          year: new FormControl(this.experience && this.experience.start.year, [
            Validators.required
          ])
        }),
        end: new FormGroup({
          month: new FormControl(this.experience && this.experience.end.month),
          year: new FormControl(this.experience && this.experience.end.year, [
            Validators.required
          ])
        }),
        description: new FormControl(
          this.experience && this.experience.description
        )
      },
      { validators: [rangeValidator] }
    );
  }

  get title() {
    return this.experienceForm.get("title");
  }

  get company() {
    return this.experienceForm.get("company").get("name");
  }

  get start() {
    return this.experienceForm.get("start").get("year");
  }

  get end() {
    return this.experienceForm.get("end").get("year");
  }

  submitForm() {
    if (this.experienceForm.valid) {
      const experience: Experience = this.experienceForm.getRawValue();
      if (this.experience) {
        experience.id = this.experience.id;
        this.experienceService.edit(experience);
      } else {
        this.experienceService.add(experience);
      }
      this.closeForm.next();
    }
  }

  close() {
    if (this.experienceForm.touched) {
      this.confirmCloseOpened = true;
    } else {
      this.closeForm.next();
    }
  }

  confirmClose(confirm: boolean) {
    if (confirm) {
      this.closeForm.next();
    } else {
      this.confirmCloseOpened = false;
    }
  }

  deleteEducation() {
    this.confirmDeleteOpened = true;
  }

  confirmDelete(confirm: boolean) {
    if (confirm) {
      this.experienceService.delete(this.experience.id);
      this.closeForm.next();
    } else {
      this.confirmDeleteOpened = false;
    }
  }
}
