import { Injectable } from "@angular/core";
import { Job } from "./../../_models/job";
import { Company } from "../../_models/company";
import { Subject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
@Injectable({
  providedIn: "root"
})
export class JobService {
  jobs: Subject<Job[]>;
  JobsList: Job[] = [];

  constructor(private http: HttpClient, private auth: AuthService) {
    this.jobs = new Subject<Job[]>();
  }

  getAll() {
    this.http
      .get<Job[]>(
        `http://localhost:3000/Jobs?userId=${this.auth.getLoggedUserId()}`
      )
      .subscribe(res => {
        this.jobs.next(res);
      });
    return this.jobs;
  }
}
