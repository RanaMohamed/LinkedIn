import { Component, OnInit, Input } from "@angular/core";
import { Job } from "./../../../_models/job";

@Component({
  selector: "app-job-card",
  templateUrl: "./job-card.component.html",
  styleUrls: ["./job-card.component.scss"]
})
export class JobCardComponent implements OnInit {
  @Input() job: Job = {
    id: 1,
    company: {
      id: 1,
      name: "",
      image: ""
    },
    title: "",
    description: "",
    location: "",
    time: "",
    connections: []
  };
  constructor() {}

  ngOnInit() {}
}
