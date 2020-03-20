import { Injectable } from "@angular/core";
import { Job } from "./../../_models/job";
import { Company } from "../../_models/company";

@Injectable({
  providedIn: "root"
})
export class JobService {
  Jobs: Job[] = [
    {
      id: 1,
      company: {
        id: 1,
        name: "Huawei",
        image:
          "https://media-exp1.licdn.com/dms/image/C510BAQHDjJMzWUhMfg/company-logo_100_100/0?e=1592438400&v=beta&t=kNJDc5wYWYBvMU-HfkJ8VGk0w4i-aEgtzWZeuDlVKJw"
      },
      title: "Software Engineer Intern / UI/UX intern",
      description: "",
      location: "",
      time: "1 Week ago",
      connections: []
    },
    {
      id: 2,
      company: {
        id: 1,
        name: "Notatee",
        image:
          "https://media-exp1.licdn.com/dms/image/C560BAQHrGfl6p9Xa-A/company-logo_100_100/0?e=1592438400&v=beta&t=MRUMt0wm9Rw9a4cNvVAMolGo0sHWhYbC8E7pmqlYlOM"
      },
      title: "Developer",
      description: "",
      location: "Cairo Governorate, Egypt",
      time: "1 day ago",
      connections: []
    },
    {
      id: 3,
      company: {
        id: 1,
        name: "CoatConnect",
        image:
          "https://media-exp1.licdn.com/dms/image/C4D0BAQEtvCa-7bHgYA/company-logo_100_100/0?e=1593043200&v=beta&t=sQRDEYnuIGgeNF9CvCQjbitBgNbTJB22Y90PvCHpmWI"
      },
      title: "Frontend Web Developer",
      description: "",
      location: "Cairo, Egypt",
      time: "1 day ago",
      connections: []
    }
  ];

  constructor() {}

  getAll() {
    return this.Jobs;
  }
}
