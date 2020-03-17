import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import { About } from "../../../../_models/about";
import { AboutService } from "./../about.service";

@Component({
  selector: "app-about-form",
  templateUrl: "./about-form.component.html",
  styleUrls: ["./about-form.component.scss"]
})
export class AboutFormComponent implements OnInit {
  @Input() about: About = {
    id: 1,
    summary: "",
    media: [],
    link: ""
  };
  @Output() closeForm = new EventEmitter();
  aboutForm: FormGroup;
  linkclicked = false;
  addClicked: false;
  confirmDeleteOpened = false;
  confirmCloseOpened = false;
  constructor(private aboutService: AboutService) {}

  ngOnInit() {
    console.log(this.about);
    this.aboutForm = new FormGroup({
      summary: new FormControl(this.about && this.about.summary),
      media: new FormArray([]),
      link: new FormControl(this.about && this.about.link, [
        Validators.pattern(
          "(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})"
        )
      ])
    });
  }

  get Link() {
    return this.aboutForm.get("link");
  }

  SaveForm() {
    if (this.aboutForm.valid) {
      const ab: About = this.aboutForm.getRawValue();
      ab.id = +this.about.id;

      if (this.about) {
        if (!this.addClicked) ab.link = "";
        ab.id = +this.about.id;
        this.aboutService.edit(ab);
      }
      this.closeForm.next();
    }
  }

  close() {
    if (this.aboutForm.touched) {
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
}
