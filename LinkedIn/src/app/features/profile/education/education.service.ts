import { Injectable } from "@angular/core";
import { Education } from "src/app/_models/education";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EducationService {
  private educations: Subject<Education[]>;
  private education: Subject<Education>;
  private list: Education[] = [
    {
      id: 1,
      school: {
        id: 1,
        name: "Information Technology Institute (ITI)",
        image:
          "https://media-exp1.licdn.com/dms/image/C560BAQGK3uuhQer46g/company-logo_100_100/0?e=1591833600&v=beta&t=bZJwqK3Xxk0jUrI8dS9dYCWOnpFOmOEIcmtg90HeOtw"
      },
      field: "Web and UI Development",
      start: { year: 2019 },
      end: { year: 2020 }
    },
    {
      id: 2,
      school: {
        id: 2,
        name: "Cairo University",
        image:
          "https://media-exp1.licdn.com/dms/image/C560BAQGYnGDX58wwLQ/company-logo_100_100/0?e=1591833600&v=beta&t=Nz58hcOnX6Q4BYQyF1B4QGfhyHY73auC2VABEioZLxo"
      },
      degree: "Bachelor's degree",
      field: "Computer Software Engineering",
      start: { year: 2014 },
      end: { year: 2018 }
    }
  ];
  private lastId = 2;
  constructor() {
    this.educations = new Subject<Education[]>();
    this.education = new Subject<Education>();
  }

  getAll(): Subject<Education[]> {
    setTimeout(() => {
      this.educations.next(this.list);
    }, 5);
    return this.educations;
  }

  getById(id: number): Subject<Education> {
    setTimeout(() => {
      this.education.next(this.list.find(ed => ed.id === id));
    }, 5);
    return this.education;
  }

  add(education: Education) {
    education.id = ++this.lastId;
    this.list.unshift(education);
    this.educations.next(this.list);
  }

  edit(education: Education) {
    const index = this.list.findIndex(ed => ed.id === education.id);
    education.school.image =
      this.list[index].school.name === education.school.name &&
      this.list[index].school.image;
    this.list[index] = education;
    this.educations.next(this.list);
  }

  delete(id: number) {
    this.list = this.list.filter(ed => ed.id !== id);
    this.educations.next(this.list);
  }
}
