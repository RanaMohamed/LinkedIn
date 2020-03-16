import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn
} from "@angular/forms";
import { Education } from "src/app/_models/education";
import { EducationService } from "../education.service";
import { years, rangeValidator } from "src/app/_utilities/utilities";

@Component({
  selector: "app-education-form",
  templateUrl: "./education-form.component.html",
  styleUrls: ["./education-form.component.scss"]
})
export class EducationFormComponent implements OnInit {
  @Input() education: Education;
  @Output() closeForm = new EventEmitter();
  educationForm: FormGroup;
  linkOpened = false;
  confirmDeleteOpened = false;
  confirmCloseOpened = false;
  years = years(1990, 2030);
  constructor(private educationService: EducationService) {}

  ngOnInit() {
    this.educationForm = new FormGroup(
      {
        school: new FormGroup({
          name: new FormControl(this.education && this.education.school.name, [
            Validators.required
          ])
        }),
        degree: new FormControl(this.education && this.education.degree),
        field: new FormControl(this.education && this.education.field),
        start: new FormGroup({
          month: new FormControl(this.education && this.education.start.month),
          year: new FormControl(this.education && this.education.start.year)
        }),
        end: new FormGroup({
          month: new FormControl(this.education && this.education.end.month),
          year: new FormControl(this.education && this.education.end.year)
        }),
        grade: new FormControl(this.education && this.education.grade),
        activities: new FormControl(
          this.education && this.education.activities
        ),
        description: new FormControl(
          this.education && this.education.description
        )
      },
      { validators: [rangeValidator] }
    );
  }

  get school() {
    return this.educationForm.get("school").get("name");
  }

  get degree() {
    return this.educationForm.get("degree");
  }

  get field() {
    return this.educationForm.get("field");
  }

  get start() {
    return this.educationForm.get("start");
  }

  get end() {
    return this.educationForm.get("end");
  }

  get grade() {
    return this.educationForm.get("grade");
  }

  get activities() {
    return this.educationForm.get("activities");
  }

  get description() {
    return this.educationForm.get("description");
  }

  submitForm() {
    if (this.educationForm.valid) {
      const education: Education = this.educationForm.getRawValue();
      if (this.education) {
        education.id = this.education.id;
        this.educationService.edit(education);
      } else {
        this.educationService.add(education);
      }
      this.closeForm.next();
    }
  }

  close() {
    if (this.educationForm.touched) {
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
      this.educationService.delete(this.education.id);
      this.closeForm.next();
    } else {
      this.confirmDeleteOpened = false;
    }
  }
}
