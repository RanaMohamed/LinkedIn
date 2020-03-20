import { Component, OnInit } from "@angular/core";
import { Job } from "./../../_models/job";
import { JobService } from "./job.service";

@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.scss"]
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.jobs = this.jobService.getAll();
  }

  filterJobs(searchJob, searchLocation) {
    if (!searchJob.value && !searchLocation.value) {
      this.jobs = this.jobService.getAll();
    } else {
      let resSearch = this.jobs.filter(
        p =>
          p.location
            .toLowerCase()
            .includes(searchLocation.value.toLowerCase()) &&
          p.title.toLowerCase().includes(searchJob.value.toLowerCase())
      );
      this.jobs = resSearch;
    }
  }
}
