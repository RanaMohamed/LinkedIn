import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { About } from "./../../../_models/about";

@Injectable({
  providedIn: "root"
})
export class AboutService {
  private aboutData: Subject<About>;

  private listOfAbouts: About[] = [
    {
      id: 1,
      media: [],
      summary:
        "seeking for the opportunity to get Full Stack Developer position , gain more experience in this field and have opportunity to travel and work outside.",
      link: ""
    }
  ];

  constructor() {
    this.aboutData = new Subject<About>();
  }

  getById(id: number): Subject<About> {
    const res = this.listOfAbouts.filter(ab => ab.id === id);

    setTimeout(() => {
      this.aboutData.next(res[0]);
    }, 5);
    return this.aboutData;
  }

  add(ab: About) {
    console.log("add fun in service");
  }

  edit(ab: About) {
    this.aboutData.next(ab);
  }
}
