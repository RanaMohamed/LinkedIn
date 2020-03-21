import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Intro } from "../../../_models/intro";
import { ContactInfo } from "../../../_models/contactInfo";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../auth/auth.service";
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
          start: { year: 2019 },
          end: { year: 2020 }
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

  constructor(private http: HttpClient, private auth: AuthService) {
    this.introInfo = new Subject<Intro>();
  }
  getById(): Observable<Intro> {
    this.http
      .get<Intro>(
        `http://localhost:3000/users/${this.auth.getLoggedUserId()}?_embed=educations`
      )
      .subscribe(res => {
        this.http.get;
        this.introInfo.next(res);
      });
    return this.introInfo;
  }

  add(intro: Intro) {
    this.http
      .post<Intro>(`http://localhost:3000/users`, intro)
      .subscribe(res => {
        this.getById().subscribe(ab => {
          ab => this.introInfo.next(ab);
        });
      });
  }

  edit(intro: Intro) {
    this.http
      .put<Intro>(
        `http://localhost:3000/users/${this.auth.getLoggedUserId()}`,
        intro
      )
      .subscribe(res => {
        this.getById().subscribe(ab => {
          ab => this.introInfo.next(ab);
        });
      });
  }
}
