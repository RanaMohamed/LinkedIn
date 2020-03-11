import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-education-form",
  templateUrl: "./education-form.component.html",
  styleUrls: ["./education-form.component.scss"]
})
export class EducationFormComponent implements OnInit {
  @Input() opened: boolean;
  @Output() closeForm = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
