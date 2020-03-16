import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Experience } from "src/app/_models/experience";

@Injectable({
  providedIn: "root"
})
export class ExperienceService {
  private experiences: Subject<Experience[]>;
  private experience: Subject<Experience>;
  private list: Experience[] = [
    {
      id: 1,
      title: "Frontend Developer",
      type: "Full-time",
      company: { name: "Ennwa" },
      start: { month: 12, year: 2018 },
      end: { month: 8, year: 2019 }
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: {
        name: "dotdev",
        image:
          "https://media-exp1.licdn.com/dms/image/C4E0BAQGUCihq_TaZsQ/company-logo_100_100/0?e=1591833600&v=beta&t=FALzL3hxk1JgO_S7PqfFMmRiqsmR-C2cP13VYYzGDVE"
      },
      start: { month: 10, year: 2017 },
      end: { month: 11, year: 2018 }
    }
  ];
  private lastId = 2;
  constructor() {
    this.experiences = new Subject<Experience[]>();
    this.experience = new Subject<Experience>();
  }

  getAll() {
    setTimeout(() => {
      this.experiences.next(this.list);
    }, 5);
    return this.experiences;
  }

  getById(id: number): Subject<Experience> {
    setTimeout(() => {
      this.experience.next(this.list.find(ex => ex.id === id));
    }, 5);
    return this.experience;
  }

  add(experience: Experience) {
    experience.id = ++this.lastId;
    this.list.unshift(experience);
    this.experiences.next(this.list);
  }

  edit(experience: Experience) {
    const index = this.list.findIndex(ex => ex.id === experience.id);
    experience.company.image =
      this.list[index].company.name === experience.company.name &&
      this.list[index].company.image;
    this.list[index] = experience;
    this.experiences.next(this.list);
  }

  delete(id: number) {
    this.list = this.list.filter(ex => ex.id !== id);
    this.experiences.next(this.list);
  }
}
