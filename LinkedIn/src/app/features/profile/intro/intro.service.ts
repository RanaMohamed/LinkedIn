import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Intro } from "src/app/_models/intro";
import { months } from "../../../_utilities/utilities";

@Injectable({
  providedIn: "root"
})
export class IntroService {
  private introInfo: Subject<Intro>;

  private listOfProfiles: Intro[] = [
    {
      id: 1,
      Fname: "Amal",
      Lname: "Elkady",
      imageUrl: "../../../../assets/imgs/client-3.jpg",
      headLine: "Full Stack Developer (Computer Sciences)",
      education: [
        {
          id: 1,
          school: {
            id: 1,
            name: "Information Technology Institute (ITI)",
            image:
              "https://media-exp1.licdn.com/dms/image/C560BAQGK3uuhQer46g/company-logo_100_100/0?e=1591833600&v=beta&t=bZJwqK3Xxk0jUrI8dS9dYCWOnpFOmOEIcmtg90HeOtw"
          },
          field: "Web and UI Development",
          start: 2019,
          end: 2020
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
          start: 2014,
          end: 2018
        }
      ],
      country: "Egypt",
      industry: "Computer Software",
      contactInfo: {
        profileUrl: "linkedin.com/in/amal-elkady-972009135",
        urls: [],
        phone: {
          num: 0,
          type: ""
        },
        address: "",
        email: "amalelkady4@gmail.com",
        instantMess: [],
        birthday: {
          day: 21,
          month: "September"
        }
      }
    }
  ];

  constructor() {
    this.introInfo = new Subject<Intro>();
  }

  getById(id: number): Subject<Intro> {
    const res = this.listOfProfiles.filter(intro => intro.id === id);

    setTimeout(() => {
      this.introInfo.next(res[0]);
    }, 5);
    return this.introInfo;
  }

  add(intro: Intro) {
    console.log("add fun in service");
  }

  edit(intro: Intro) {
    this.introInfo.next(intro);
  }
}
