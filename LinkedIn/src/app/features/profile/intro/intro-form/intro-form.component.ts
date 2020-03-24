import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Intro } from "src/app/_models/intro";
import { IntroService } from "../intro.service";
import { Education } from "../../../../_models/education";
import { EducationService } from "../../education/education.service";
import { months } from "../../../../_utilities/utilities";
import { ContactInfo } from "../../../../_models/contactInfo";

@Component({
  selector: "app-intro-form",
  templateUrl: "./intro-form.component.html",
  styleUrls: ["./intro-form.component.scss"]
})
export class IntroFormComponent implements OnInit {
  @Input() intro: Intro = {
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
  @Output() closeForm = new EventEmitter();
  IntroForm: FormGroup;
  educations: Education[] = [];
  confirmCloseOpened = false;
  contactInfOpened = false;
  editIntrOpened = true;
  industries: string[];
  disableEdu = true;
  educationOpened = false;
  experienceOpened = false;
  contact: ContactInfo = {
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
  };

  constructor(
    private introService: IntroService,
    private educationService: EducationService
  ) {
    this.industries = [
      "Accounting",
      "Airlines/Aviation",
      "Alternative Dispute Resolution",
      "Alternative Medicine",
      "Animation",
      "Apparel & Fashion",
      "Capital Markets",
      "Civic & Social Organization",
      "Computer & Network Security",
      "Computer Games",
      "Computer Hardware",
      "Computer Networking",
      "Computer Software",
      "Consumer Services"
    ];
  }

  ngOnInit() {
    this.IntroForm = new FormGroup({
      Fname: new FormControl(this.intro && this.intro.Fname, [
        Validators.required
      ]),
      Lname: new FormControl(this.intro && this.intro.Lname, [
        Validators.required
      ]),
      imageUrl: new FormControl(this.intro && this.intro.imageUrl),
      headLine: new FormControl(this.intro && this.intro.headLine, [
        Validators.required
      ]),
      education: new FormArray([]),
      country: new FormControl(this.intro && this.intro.country, [
        Validators.required
      ]),
      locationInCountry: new FormControl(
        this.intro && this.intro.locationInCountry
      ),
      industry: new FormControl(this.intro && this.intro.industry, [
        Validators.required
      ]),
      contactInfo: new FormGroup({}),
      showEdu: new FormControl(this.intro)
    });

    this.educationService.getAll().subscribe(edu => {
      this.educations = edu;
    });

    this.IntroForm.get("showEdu").valueChanges.subscribe(value => {
      this.disableEdu = !this.disableEdu;
    });
  }

  get Fname() {
    return this.IntroForm.get("Fname");
  }

  get Lname() {
    return this.IntroForm.get("Lname");
  }

  get HeadLine() {
    return this.IntroForm.get("headLine");
  }

  get Country() {
    return this.IntroForm.get("country");
  }

  get Industry() {
    return this.IntroForm.get("industry");
  }

  openContactInfo() {
    this.contactInfOpened = !this.contactInfOpened;
    this.editIntrOpened = !this.editIntrOpened;
  }

  infoFromContact(e) {
    this.contact = e;
    console.log(" contact ", this.contact);
  }

  OnsubmitForm() {
    if (this.IntroForm.valid) {
      const intro: Intro = this.IntroForm.getRawValue();

      if (this.intro) {
        intro.id = +this.intro.id;
        if (this.disableEdu) intro.education = this.educations;
        intro.contactInfo = this.contact;
        this.introService.edit(intro);
      }
      this.closeForm.next();
    }
  }

  close() {
    if (this.IntroForm.touched) {
      this.confirmCloseOpened = true;
    } else {
      this.closeForm.next();
    }
  }

  confirmClose(confirm: boolean) {
    if (confirm) {
      this.closeForm.next();
    } else {
      this.confirmCloseOpened = false;
    }
  }
}
