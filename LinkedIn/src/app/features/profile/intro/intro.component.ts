import { Component, OnInit } from "@angular/core";
import { IntroService } from "./intro.service";
import { Intro } from "../../../_models/intro";
import { months } from "../../../_utilities/utilities";

@Component({
  selector: "app-intro",
  templateUrl: "./intro.component.html",
  styleUrls: ["./intro.component.scss"]
})
export class IntroComponent implements OnInit {
  intro: Intro = {
    id: 1,
    Fname: "",
    Lname: "",
    imageUrl: "",
    headLine: "",
    education: [
      {
        id: 1,
        school: {
          id: 1,
          name: "",
          image: ""
        },
        field: "",
        start: { month: 2, year: 2019 },
        end: { month: 2, year: 2020 }
      }
    ],
    country: "",
    industry: "",
    contactInfo: {
      profileUrl: "",
      urls: [],
      phone: {
        num: 0,
        type: ""
      },
      address: "",
      email: "",
      instantMess: [],
      birthday: {
        day: new Date().getDay(),
        month: months[new Date().getMonth()]
      }
    }
  };
  formOpened = false;
  openContact = false;
  constructor(private introService: IntroService) {}

  ngOnInit() {
    this.introService.getById().subscribe(r => (this.intro = r));
  }

  OpenContact() {
    this.openContact = !this.openContact;
  }
  closeModal() {
    this.formOpened = false;
  }
  editContact(e) {
    this.intro.contactInfo = e;
  }
}
